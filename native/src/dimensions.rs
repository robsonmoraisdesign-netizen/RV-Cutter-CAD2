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
    session.execute(
        "sketch.dimension",
        &json!({
            "entities": [a, b],
            "type": kind,
            "value": format!("{target_mm} mm"),
            "scale_sketch": true
        }),
    ).map_err(|error| error.to_string())?;
    Ok(())
}
