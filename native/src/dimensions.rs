//! Automatically add a driving dimension for the longest bounding axis
//! of a raster-imported editable Sketch. Keep the drawing scale in millimetres.
//! Uses true end-point references rather than unrelated construction geometry.
use crate::Result;
use serde_json::json;
use solidcraft_engine::{Session, sketch::Shape};

pub fn constrain_longest_axis(session: &mut Session, target_mm: f64) -> Result<()> {
    if !target_mm.is_finite() || !(0.1..=100_000.0).contains(&target_mm) {
        return Err("Tamanho fisico invalido para cota automatica.".into());
    }
    let id = session.active_sketch.ok_or("Nao existe Sketch ativo.")?;
    let sketch = session.doc.sketch(id).map_err(|error| error.to_string())?;
    if sketch.curves.len() > 256 {
        return Err("Cota proporcional: limite de 256 curvas. Aumente a simplificação ou desative a cota automática para importar e editar o contorno.".into());
    }
    let mut left: Option<(f64, String)> = None;
    let mut right: Option<(f64, String)> = None;
    let mut top: Option<(f64, String)> = None;
    let mut bottom: Option<(f64, String)> = None;
    for (index, curve) in sketch.curves.iter().enumerate() {
        if curve.construction {
            continue;
        }
        if let Some(Shape::Line { a, b }) = sketch.shape(index) {
            for (suffix, p) in [("start", a), ("end", b)] {
                let reference = format!("{}.{}", curve.id, suffix);
                if left.as_ref().is_none_or(|v| p.x < v.0) {
                    left = Some((p.x, reference.clone()));
                }
                if right.as_ref().is_none_or(|v| p.x > v.0) {
                    right = Some((p.x, reference.clone()));
                }
                if bottom.as_ref().is_none_or(|v| p.y < v.0) {
                    bottom = Some((p.y, reference.clone()));
                }
                if top.as_ref().is_none_or(|v| p.y > v.0) {
                    top = Some((p.y, reference));
                }
            }
        }
    }
    let (min_x, a_x) = left.ok_or("Sem extremidades de linha para cotar.")?;
    let (max_x, b_x) = right.ok_or("Sem extensao horizontal.")?;
    let (min_y, a_y) = bottom.ok_or("Sem extensao vertical.")?;
    let (max_y, b_y) = top.ok_or("Sem extensao vertical.")?;
    let (kind, a, b) = if max_x - min_x >= max_y - min_y {
        ("horizontal", a_x, b_x)
    } else {
        ("vertical", a_y, b_y)
    };
    if a == b {
        return Err("O contorno nao tem dois pontos distintos para cotar.".into());
    }
    let master = format!("rv_tamanho_{id}");
    session
        .execute(
            "parameters.add",
            &json!({
                "name": master, "expression": format!("{target_mm} mm")
            }),
        )
        .map_err(|e| e.to_string())?;
    session
        .execute(
            "sketch.dimension",
            &json!({
                "entities": [a, b],
                "type": kind,
                "value": master,
                "scale_sketch": true
            }),
        )
        .map_err(|error| error.to_string())?;
    // Infer only exact relationships: approximate snapping would change the logo.
    let result = session
        .execute(
            "sketch.auto_constrain",
            &json!({
                "tolerance": 0.0000001, "angle_tolerance": 0.00001
            }),
        )
        .map_err(|e| e.to_string())?;
    if result["dof"].as_u64() != Some(0) {
        return Err("Não foi possível restringir a forma proporcionalmente. Importe sem cota automática para editar o Sketch.".into());
    }
    let sketch = session.doc.sketch(id).map_err(|e| e.to_string())?;
    let lengths: Vec<_> = sketch
        .constraints
        .iter()
        .filter(|c| !c.driven && !c.kind.is_angle())
        .filter_map(|c| Some((c.param.clone()?, c.kind.value()?)))
        .filter(|(name, _)| name != &master)
        .collect();
    for (name, value) in lengths {
        session
            .execute(
                "parameters.change",
                &json!({
                    "name": name, "expression": format!("{master} * {}", value / target_mm)
                }),
            )
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}
