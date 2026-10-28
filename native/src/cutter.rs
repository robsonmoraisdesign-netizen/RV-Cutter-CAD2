//! First native cookie-cutter manufacturing feature: a parametric thin-wall
//! B-rep cutter and a reinforcing base, both driven by named design parameters.
//! The source Sketch stays in the timeline and can be edited afterwards.
use crate::{Result, recipe};
use serde_json::json;
use solidcraft_engine::Session;

#[derive(Clone, Copy, Debug)]
pub struct CutterSettings {
    pub blade_height_mm: f64,
    pub blade_thickness_mm: f64,
    pub base_height_mm: f64,
    pub base_width_mm: f64,
}

impl Default for CutterSettings {
    fn default() -> Self {
        Self {
            blade_height_mm: 12.5,
            blade_thickness_mm: 0.8,
            base_height_mm: 2.5,
            base_width_mm: 4.0,
        }
    }
}

impl CutterSettings {
    pub fn validate(&self) -> Result<()> {
        let limits = [
            (self.blade_height_mm, 4.0, 100.0, "Altura da lamina"),
            (self.blade_thickness_mm, 0.3, 5.0, "Espessura da lamina"),
            (self.base_height_mm, 0.5, 20.0, "Altura da base"),
            (self.base_width_mm, 0.5, 20.0, "Largura da base"),
        ];
        for (value, low, high, label) in limits {
            if !value.is_finite() || value < low || value > high {
                return Err(format!("{label}: valor fora de {low} a {high} mm."));
            }
        }
        if self.base_height_mm >= self.blade_height_mm {
            return Err("A base deve ser mais baixa que a lamina.".into());
        }
        if self.base_width_mm <= self.blade_thickness_mm {
            return Err("A largura da base precisa superar a espessura da lamina.".into());
        }
        Ok(())
    }
}

/// Turns the currently edited XY Sketch into a thin-wall cutter. Atomic: undo
/// removes the whole manufacturing feature; failed B-rep creation restores the
/// source Sketch without leaving half-built solids or orphan parameters.
pub fn create(session: &mut Session, settings: &CutterSettings) -> Result<()> {
    let sketch_id = session
        .active_sketch
        .ok_or("Escolha um Sketch para criar o cortador.")?;
    create_from_sketch(session, sketch_id, settings)
}
/// Finished sketches can be selected independently of the active editor.
pub fn create_from_sketch(
    session: &mut Session,
    sketch_id: u64,
    settings: &CutterSettings,
) -> Result<()> {
    settings.validate()?;
    if session
        .doc
        .feature(sketch_id)
        .is_none_or(|feature| feature.suppressed)
    {
        return Err("Sketch ausente ou suprimido. Escolha outro contorno.".into());
    }
    let sketch = session
        .doc
        .sketch(sketch_id)
        .map_err(|error| error.to_string())?;
    if sketch.curves.is_empty() {
        return Err("Desenhe ou importe ao menos um contorno no Sketch.".into());
    }
    if sketch.curves.len() > 800 {
        return Err(
            "Sketch complexo demais para converter automaticamente: simplifique os contornos."
                .into(),
        );
    }
    let height = format!("rv_lamina_altura_{sketch_id}");
    let wall = format!("rv_lamina_espessura_{sketch_id}");
    let base_height = format!("rv_base_altura_{sketch_id}");
    let base_width = format!("rv_base_largura_{sketch_id}");
    let recipe = json!({
        "format": "rv-parametric-recipe-1",
        "name": format!("Cortador de biscoito RV - Sketch {sketch_id}"),
        "commands": [
            {"command": "parameters.add",
             "params": {"name": height, "expression": format!("{} mm", settings.blade_height_mm)}},
            {"command": "parameters.add",
             "params": {"name": wall, "expression": format!("{} mm", settings.blade_thickness_mm)}},
            {"command": "parameters.add",
             "params": {"name": base_height, "expression": format!("{} mm", settings.base_height_mm)}},
            {"command": "parameters.add",
             "params": {"name": base_width, "expression": format!("{} mm", settings.base_width_mm)}},
            {"command": "solid.extrude",
             "params": {"sketch": sketch_id, "thin": true, "thickness": wall,
                         "side": "outside", "distance": height, "operation": "new",
                         "name": format!("Lamina RV {sketch_id}"),
                         "body_name": format!("Cortador RV {sketch_id}")}},
            {"command": "solid.extrude",
             "params": {"sketch": sketch_id, "thin": true, "thickness": base_width,
                         "side": "outside", "distance": base_height, "operation": "join",
                         "targets": [format!("Cortador RV {sketch_id}")],
                         "name": format!("Base RV {sketch_id}")}}
        ]
    });
    recipe::apply(session, &recipe)
}

/// Prepare a separate editable outline. The original image Sketch is preserved.
/// This first-stage preview is an evaluated copy, not an associative CAD feature.
pub fn prepare_outer_outline(
    session: &Session,
    sketch_id: u64,
    border: crate::border::Border,
    tolerance_mm: f64,
) -> Result<crate::Import> {
    use solidcraft_engine::sketch::Shape;
    if !tolerance_mm.is_finite() || !(0.001..=0.2).contains(&tolerance_mm) {
        return Err("Precisão do contorno: use de 0,001 a 0,2 mm.".into());
    }
    if session.doc.feature(sketch_id).is_none_or(|f| f.suppressed) {
        return Err("Sketch ausente ou suprimido.".into());
    }
    use solidcraft_engine::doc::{FeatureKind, PlaneRef};
    if !matches!(session.doc.feature(sketch_id).map(|f| &f.kind),
        Some(FeatureKind::Sketch {plane: PlaneRef::Origin {name}, ..}) if name == "XY")
    {
        return Err("Nesta etapa, prepare a borda de um Sketch no plano XY.".into());
    }
    let sketch = session.doc.sketch(sketch_id).map_err(|e| e.to_string())?;
    let mut lines = Vec::new();
    for (index, curve) in sketch.curves.iter().enumerate() {
        if curve.construction {
            continue;
        }
        match sketch.shape(index) {
            Some(Shape::Line { a, b }) => lines.push(([a.x, a.y], [b.x, b.y])),
            _ => {
                return Err(
                    "Contorno externo: nesta etapa use linhas de uma imagem PNG/JPG vetorizada."
                        .into(),
                );
            }
        }
    }
    let rings = crate::border::rings_from_lines(&lines)?;
    let outer = rings.first().ok_or("Nenhum contorno fechado.")?;
    let simplified = crate::raster::simplify_ring(outer, tolerance_mm);
    let points = crate::border::generate(&simplified, border)?;
    if points.len() > 800 {
        return Err(format!(
            "A borda tem {} segmentos. Reduza repetições ou aumente a tolerância (máximo 0,2 mm).",
            points.len()
        ));
    }
    // Native Sketch is Y-up; SVG coordinates are Y-down.
    let svg_points = points.into_iter().map(|p| [p[0], -p[1]]).collect();
    Ok(crate::Import {
        name: format!(
            "Borda externa de #{sketch_id} ({:?}, {} rep., {} mm)",
            border.pattern, border.repeats, border.depth_mm
        ),
        svg: crate::raster::polygons_svg(&[svg_points])?,
    })
}
