//! Native RV document, Sketch and B-rep integration. No JavaScript runtime.
#![forbid(unsafe_code)]
#![deny(clippy::unwrap_used, clippy::expect_used, clippy::panic)]
pub mod cutter;
pub mod dimensions;
pub mod raster;
pub mod recipe;
use serde_json::{Value, json};
use solidcraft_engine::{Session, Snapshot};
use std::path::Path;
pub type Result<T> = std::result::Result<T, String>;
#[derive(Clone, Debug)]
pub struct Import {
    pub name: String,
    pub svg: String,
}
pub fn prepare_import(path: &Path, size: f64, threshold: u8) -> Result<Vec<Import>> {
    prepare_import_with_options(
        path,
        size,
        raster::TraceOptions {
            threshold,
            ..Default::default()
        },
    )
}
pub fn prepare_import_with_options(
    path: &Path,
    size: f64,
    options: raster::TraceOptions,
) -> Result<Vec<Import>> {
    if std::fs::metadata(path).map_err(|e| e.to_string())?.len() > 32 * 1024 * 1024 {
        return Err("Arquivo excede 32 MB.".into());
    }
    let bytes = std::fs::read(path).map_err(|e| e.to_string())?;
    let name = path
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("Importado")
        .to_string();
    match path
        .extension()
        .and_then(|s| s.to_str())
        .unwrap_or("")
        .to_lowercase()
        .as_str()
    {
        "svg" => Ok(vec![Import {
            name,
            svg: String::from_utf8(bytes).map_err(|e| e.to_string())?,
        }]),
        "png" | "jpg" | "jpeg" => Ok(vec![Import {
            name,
            svg: raster::trace_with_options(&bytes, size, options)?,
        }]),
        "rvcad" | "json" => legacy_outlines(&bytes),
        _ => Err("Use PNG, JPG, SVG ou projeto RV .rvcad.".into()),
    }
}
/// Legacy projects migrate evaluated outlines only; UI explicitly discloses this limitation.
pub fn legacy_outlines(bytes: &[u8]) -> Result<Vec<Import>> {
    let p: Value = serde_json::from_slice(bytes).map_err(|e| e.to_string())?;
    if p.get("format").and_then(Value::as_str) != Some("rv-cad-13") {
        return Err("Formato de projeto RV incompatível.".into());
    }
    let objects = p
        .get("objects")
        .and_then(Value::as_array)
        .ok_or("Objetos ausentes.")?;
    if objects.len() > 100 {
        return Err("Limite: 100 objetos por importação.".into());
    }
    let mut out = Vec::new();
    for (i, o) in objects.iter().enumerate() {
        let scale = o
            .pointer("/params/size")
            .and_then(Value::as_f64)
            .ok_or("Tamanho ausente.")?;
        if !scale.is_finite() || scale <= 0.0 || scale > 100000.0 {
            return Err("Tamanho inválido.".into());
        }
        let loops = o
            .get("loops")
            .and_then(Value::as_array)
            .ok_or("Contornos ausentes.")?;
        let mut polygons = Vec::new();
        for ring in loops {
            let points = ring.as_array().ok_or("Contorno inválido.")?;
            if points.len() < 3 {
                continue;
            }
            let mut polygon = Vec::new();
            for pt in points {
                let x = pt.get(0).and_then(Value::as_f64).ok_or("Ponto inválido.")? * scale;
                let y = pt.get(1).and_then(Value::as_f64).ok_or("Ponto inválido.")? * scale;
                if !x.is_finite() || !y.is_finite() || x.abs() > 1e6 || y.abs() > 1e6 {
                    return Err("Coordenada fora do limite.".into());
                }
                polygon.push([x, -y]);
            }
            polygons.push(polygon);
        }
        if !polygons.is_empty() {
            out.push(Import {
                name: o
                    .get("name")
                    .and_then(Value::as_str)
                    .map(str::to_string)
                    .unwrap_or_else(|| format!("RV {}", i + 1)),
                svg: raster::polygons_svg(&polygons)?,
            });
        }
    }
    if out.is_empty() {
        return Err("Sem contornos fechados para migrar.".into());
    }
    Ok(out)
}
/// Import is one undo step, and rolls back the whole batch on failure.
pub fn import_into(s: &mut Session, imports: &[Import]) -> Result<()> {
    import_into_with_size(s, imports, None)
}

/// Raster imports can include an editable size dimension in the same undo step.
/// SVG/legacy imports keep their original native dimensions by default.
pub fn import_into_with_size(
    s: &mut Session,
    imports: &[Import],
    raster_size_mm: Option<f64>,
) -> Result<()> {
    import_into_report(s, imports, raster_size_mm).map(|_| ())
}
#[derive(Debug, Default)]
pub struct ImportReport {
    pub curves: usize,
    pub proportional_size: bool,
    pub notice: Option<String>,
}
/// Keep valid imported geometry if optional proportional constraints cannot run.
pub fn import_into_report(
    s: &mut Session,
    imports: &[Import],
    raster_size_mm: Option<f64>,
) -> Result<ImportReport> {
    if raster_size_mm.is_some_and(|v| !v.is_finite() || !(0.1..=100_000.0).contains(&v)) {
        return Err("Tamanho físico inválido.".into());
    }
    let mut report = ImportReport::default();
    if imports.is_empty() {
        return Err("Nada para importar.".into());
    }
    let cp = s.checkpoint();
    let snapshot = Snapshot {
        label: "Importar contornos RV".into(),
        doc: s.doc.clone(),
        active_sketch: s.active_sketch,
        pending_moves: s.pending_moves.clone(),
    };
    let n = s.undo.len();
    let run = (|| -> Result<()> {
        if s.active_sketch.is_some() {
            s.execute("sketch.finish", &json!({}))
                .map_err(|e| e.to_string())?;
        }
        let mut last = None;
        for (index, item) in imports.iter().enumerate() {
            let r = s
                .execute(
                    "sketch.insert_svg",
                    &json!({"text":item.svg,"name":item.name,"plane":"XY","tolerance":0.001}),
                )
                .map_err(|e| e.to_string())?;
            last = r.get("sketch").and_then(Value::as_u64);
            if index + 1 < imports.len() {
                s.execute("sketch.finish", &json!({}))
                    .map_err(|e| e.to_string())?;
            }
        }
        if let Some(id) = last {
            report.curves = s.doc.sketch(id).map_err(|e| e.to_string())?.curves.len();
            if let Some(size) = raster_size_mm {
                if report.curves > 256 {
                    report.notice = Some(format!(
                        "Importado: {} curvas no tamanho escolhido. Cota proporcional não aplicada acima de 256 curvas; Sketch editável.",
                        report.curves
                    ));
                } else {
                    let size_checkpoint = s.checkpoint();
                    let size_result = dimensions::constrain_longest_axis(s, size);
                    let restore_result = if size_result.is_err() {
                        s.restore_checkpoint(size_checkpoint)
                            .map_err(|e| e.to_string())
                    } else {
                        Ok(())
                    };
                    s.drop_checkpoint(size_checkpoint);
                    restore_result?;
                    match size_result {
                        Ok(()) => report.proportional_size = true,
                        Err(error) => {
                            report.notice = Some(format!(
                                "Contorno importado; cota proporcional não aplicada: {error}"
                            ))
                        }
                    }
                }
            }
        }
        Ok(())
    })();
    if let Err(error) = run {
        let r = s
            .restore_checkpoint(cp)
            .map_err(|e| format!("{error}; restaurar: {e}"));
        s.drop_checkpoint(cp);
        r?;
        return Err(error);
    }
    s.drop_checkpoint(cp);
    s.undo.truncate(n);
    s.undo.push(snapshot);
    s.redo.clear();
    Ok(report)
}
/// Reference parametric document: dimensions and extrusion driven by named expressions.
pub fn demo(s: &mut Session) -> Result<()> {
    for (id, p) in [
        (
            "parameters.add",
            json!({"name":"largura_rv","expression":"60 mm"}),
        ),
        (
            "parameters.add",
            json!({"name":"profundidade_rv","expression":"40 mm"}),
        ),
        (
            "parameters.add",
            json!({"name":"altura_rv","expression":"12 mm"}),
        ),
        ("sketch.create", json!({"plane":"XY","name":"Perfil RV"})),
        (
            "sketch.rectangle.center",
            json!({"center":[0,0],"corner":[30,20]}),
        ),
        (
            "sketch.dimension",
            json!({"entities":["l1"],"value":"largura_rv"}),
        ),
        (
            "sketch.dimension",
            json!({"entities":["l2"],"value":"profundidade_rv"}),
        ),
        ("sketch.finish", json!({})),
        (
            "solid.extrude",
            json!({"sketch":"Perfil RV","distance":"altura_rv","operation":"new","body_name":"Corpo RV"}),
        ),
    ] {
        s.execute(id, &p).map_err(|e| e.to_string())?;
    }
    Ok(())
}
