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
    settings.validate()?;
    let sketch_id = session
        .active_sketch
        .ok_or("Abra ou importe um Sketch antes de criar um cortador.")?;
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
