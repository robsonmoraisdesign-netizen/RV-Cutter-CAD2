#![forbid(unsafe_code)]
use serde_json::{Value as V, json};
use solidcraft_geom::Vec2;
use solidcraft_sketch::{ConstraintKind as C, CurveKind, Shape, Sketch};
use std::{collections::HashMap, f64::consts::TAU};
use wasm_bindgen::prelude::*;
type R<T> = Result<T, String>;
const EPS: f64 = 1e-7;
fn err(e: impl std::fmt::Display) -> String {
    e.to_string()
}
fn num(v: &V) -> R<f64> {
    v.as_f64()
        .filter(|x| x.is_finite() && x.abs() <= 1e6)
        .ok_or("Número inválido".into())
}
fn pt(v: &V) -> R<Vec2> {
    Ok(Vec2::new(num(&v[0])?, num(&v[1])?))
}
fn xy(v: Vec2) -> V {
    json!([v.x, v.y])
}
fn typ(v: &V) -> &str {
    v["type"].as_str().unwrap_or("")
}
fn ident(v: &V) -> R<&str> {
    v["id"].as_str().ok_or("ID ausente".into())
}
fn list<'a>(v: &'a V, key: &str) -> R<&'a Vec<V>> {
    v[key].as_array().ok_or(format!("Lista ausente: {key}"))
}
fn sweep(e: &V) -> R<f64> {
    let d = (num(&e["endAngle"])? - num(&e["startAngle"])?).rem_euclid(TAU);
    Ok(if e["ccw"] == false {
        if d < EPS { -TAU } else { d - TAU }
    } else if d < EPS {
        TAU
    } else {
        d
    })
}
fn point_at(e: &V, t: f64) -> R<Vec2> {
    match typ(e) {
        "line" => Ok(pt(&e["start"])?.lerp(pt(&e["end"])?, t)),
        "circle" | "arc" => {
            let a = if typ(e) == "circle" {
                TAU * t
            } else {
                num(&e["startAngle"])? + sweep(e)? * t
            };
            Ok(pt(&e["center"])? + Vec2::new(a.cos(), a.sin()) * num(&e["radius"])?)
        }
        "bezier" => {
            let mut p = list(e, "points")?.iter().map(pt).collect::<R<Vec<_>>>()?;
            if p.len() < 2 || p.len() > solidcraft_geom::MAX_BEZIER_CTRL {
                return Err("Bézier requer entre 2 e 10 pontos de controle".into());
            }
            for n in (1..p.len()).rev() {
                for i in 0..n {
                    p[i] = p[i].lerp(p[i + 1], t)
                }
            }
            Ok(p[0])
        }
        _ => Err("Entidade sem curva".into()),
    }
}
fn parameter(e: &V, p: Vec2) -> R<f64> {
    match typ(e) {
        "line" => {
            let a = pt(&e["start"])?;
            let d = pt(&e["end"])? - a;
            Ok((p - a).dot(d) / d.len2().max(1e-24))
        }
        "circle" => Ok((p - pt(&e["center"])?).angle().rem_euclid(TAU) / TAU),
        "arc" => {
            let s = sweep(e)?;
            let d = ((p - pt(&e["center"])?).angle() - num(&e["startAngle"])?) * s.signum();
            Ok(d.rem_euclid(TAU) / s.abs())
        }
        "bezier" => {
            let mut best = (f64::INFINITY, 0.);
            for i in 0..=512 {
                let t = i as f64 / 512.;
                let d = point_at(e, t)?.dist(p);
                if d < best.0 {
                    best = (d, t)
                }
            }
            Ok(best.1)
        }
        _ => Err("Tipo não suportado".into()),
    }
}
fn shape(e: &V) -> R<Shape> {
    match typ(e) {
        "line" => Ok(Shape::Line {
            a: pt(&e["start"])?,
            b: pt(&e["end"])?,
        }),
        "circle" | "arc" => {
            let r = num(&e["radius"])?;
            if r <= EPS {
                return Err("Raio inválido".into());
            }
            Ok(Shape::Round {
                c: pt(&e["center"])?,
                r,
                start: 0.,
                sweep: TAU,
            })
        }
        _ => Err("Curva não analítica".into()),
    }
}
fn hits(a: &V, b: &V, infinite: bool) -> R<Vec<f64>> {
    // Bézier is intersected adaptively as bounded line spans; output remains an exact Bézier subcurve.
    let segments = |e: &V| -> R<Vec<(V, f64, f64)>> {
        if typ(e) != "bezier" {
            return Ok(vec![(e.clone(), 0., 1.)]);
        }
        let mut out = vec![];
        fn split(e: &V, a: f64, b: f64, depth: u8, out: &mut Vec<(V, f64, f64)>) -> R<()> {
            let p = point_at(e, a)?;
            let q = point_at(e, b)?;
            let m = (a + b) / 2.;
            let error = point_at(e, m)?
                .dist(p.lerp(q, 0.5))
                .max(point_at(e, (3. * a + b) / 4.)?.dist(p.lerp(q, 0.25)))
                .max(point_at(e, (a + 3. * b) / 4.)?.dist(p.lerp(q, 0.75)));
            if error > 0.001 && depth < 16 {
                split(e, a, m, depth + 1, out)?;
                split(e, m, b, depth + 1, out)?
            } else {
                out.push((json!({"type":"line","start":xy(p),"end":xy(q)}), a, b));
            }
            Ok(())
        }
        split(e, 0., 1., 0, &mut out)?;
        Ok(out)
    };
    let mut out = vec![];
    for (aa, u, v) in segments(a)? {
        for (bb, _, _) in segments(b)? {
            for p in solidcraft_sketch::intersections(&shape(&aa)?, &shape(&bb)?) {
                let ta = parameter(&aa, p)?;
                let tb = parameter(&bb, p)?;
                if (infinite || (-EPS..=1. + EPS).contains(&ta)) && (-EPS..=1. + EPS).contains(&tb)
                {
                    out.push(u + (v - u) * ta);
                }
            }
        }
    }
    out.sort_by(f64::total_cmp);
    out.dedup_by(|x, y| (*x - *y).abs() < EPS);
    Ok(out)
}
fn refs(v: &V, id: &str) -> bool {
    match v {
        V::String(s) => s == id,
        V::Array(a) => a.iter().any(|x| refs(x, id)),
        V::Object(o) => o
            .iter()
            .any(|(k, x)| k != "id" && k != "geometry" && refs(x, id)),
        _ => false,
    }
}
fn detach(s: &mut V, id: &str) -> usize {
    let mut n = 0;
    for key in ["constraints", "dimensions"] {
        if let Some(a) = s[key].as_array_mut() {
            let before = a.len();
            a.retain(|v| !refs(v, id));
            n += before - a.len();
        }
    }
    n
}
fn subcurve(e: &V, a: f64, b: f64) -> R<V> {
    let mut out = e.clone();
    match typ(e) {
        "line" => {
            out["start"] = xy(point_at(e, a)?);
            out["end"] = xy(point_at(e, b)?);
        }
        "circle" | "arc" => {
            out["type"] = json!("arc");
            let start = if typ(e) == "circle" {
                0.
            } else {
                num(&e["startAngle"])?
            };
            let s = if typ(e) == "circle" { TAU } else { sweep(e)? };
            out["startAngle"] = json!(start + s * a);
            out["endAngle"] = json!(start + s * b);
            out["ccw"] = json!(s > 0.);
        }
        "bezier" => {
            fn split(p: &[Vec2], t: f64) -> (Vec<Vec2>, Vec<Vec2>) {
                let mut p = p.to_vec();
                let (mut l, mut r) = (vec![p[0]], vec![p[p.len() - 1]]);
                for n in (1..p.len()).rev() {
                    for i in 0..n {
                        p[i] = p[i].lerp(p[i + 1], t)
                    }
                    l.push(p[0]);
                    r.push(p[n - 1]);
                }
                r.reverse();
                (l, r)
            }
            let p = list(e, "points")?.iter().map(pt).collect::<R<Vec<_>>>()?;
            let (_, right) = split(&p, a);
            let (kept, _) = split(&right, (b - a) / (1. - a));
            out["points"] = V::Array(kept.into_iter().map(xy).collect());
        }
        _ => return Err("Aparar não se aplica a pontos".into()),
    }
    Ok(out)
}
fn edit(mut s: V, id: &str, click: Vec2, extend: bool) -> R<V> {
    let entities = list(&s, "entities")?;
    let index = entities
        .iter()
        .position(|e| ident(e).ok() == Some(id))
        .ok_or("Entidade não encontrada")?;
    let target = entities[index].clone();
    if !["line", "arc", "circle", "bezier"].contains(&typ(&target)) {
        return Err("Selecione uma curva".into());
    }
    let mut cuts = vec![];
    for e in entities {
        if ident(e)? != id && e["construction"] != true && typ(e) != "point" {
            cuts.extend(hits(&target, e, extend)?);
        }
    }
    cuts.sort_by(f64::total_cmp);
    cuts.dedup_by(|a, b| (*a - *b).abs() < EPS);
    let t = parameter(&target, click)?;
    if extend {
        if typ(&target) != "line" {
            return Err("Prolongar requer uma linha".into());
        }
        let end = t >= 0.5;
        let hit = cuts
            .into_iter()
            .filter(|x| if end { *x > 1. + EPS } else { *x < -EPS })
            .min_by(|a, b| (a - t).abs().total_cmp(&(b - t).abs()))
            .ok_or("Nenhum limite real encontrado nessa direção")?;
        let removed = detach(&mut s, id);
        s["entities"][index][if end { "end" } else { "start" }] = xy(point_at(&target, hit)?);
        return Ok(
            json!({"sketch":s,"report":{"relationsRemoved":removed,"endpoint":if end{"end"}else{"start"}}}),
        );
    }
    let mut ranges = vec![];
    if typ(&target) == "circle" {
        if cuts.len() >= 2 {
            let mut bounds = cuts.clone();
            bounds.push(cuts[0] + 1.);
            let click = if t < cuts[0] { t + 1. } else { t };
            for w in bounds.windows(2) {
                if click >= w[0] - EPS && click <= w[1] + EPS {
                    ranges.push((w[1], w[0] + 1.));
                    break;
                }
            }
        }
    } else {
        cuts.retain(|x| *x > EPS && *x < 1. - EPS);
        let mut bounds = vec![0.];
        bounds.extend(cuts);
        bounds.push(1.);
        let tc = t.clamp(0., 1.);
        let w = bounds
            .windows(2)
            .find(|w| tc >= w[0] - EPS && tc <= w[1] + EPS)
            .ok_or("Trecho não encontrado")?;
        if w[0] > EPS {
            ranges.push((0., w[0]))
        }
        if w[1] < 1. - EPS {
            ranges.push((w[1], 1.))
        }
    }
    let removed = detach(&mut s, id);
    let mut replacements = vec![];
    for (i, (a, b)) in ranges.iter().enumerate() {
        let mut e = subcurve(&target, *a, *b)?;
        if i > 0 {
            let mut k = 1;
            let mut name = format!("{id}-split-{k}");
            while list(&s, "entities")?.iter().any(|v| v["id"] == name) {
                k += 1;
                name = format!("{id}-split-{k}");
            }
            e["id"] = json!(name);
        }
        replacements.push(e);
    }
    let es = s["entities"].as_array_mut().ok_or("Entidades inválidas")?;
    es.splice(index..index + 1, replacements);
    Ok(
        json!({"sketch":s,"report":{"removed":ranges.is_empty(),"split":ranges.len()>1,"relationsRemoved":removed}}),
    )
}
struct Mapping {
    sk: Sketch,
    curves: HashMap<String, usize>,
    points: HashMap<(String, String), usize>,
}
fn mapped(s: &V) -> R<Mapping> {
    let mut m = Mapping {
        sk: Sketch::new(),
        curves: HashMap::new(),
        points: HashMap::new(),
    };
    for e in list(s, "entities")? {
        let id = ident(e)?.to_owned();
        let mut add = |name: &str, p: Vec2| -> R<usize> {
            let i = m.sk.add_point(p, None).map_err(err)?;
            m.points.insert((id.clone(), name.into()), i);
            Ok(i)
        };
        let curve = match typ(e) {
            "point" => {
                add("point", pt(&e["position"])?)?;
                None
            }
            "line" => Some(CurveKind::Line {
                a: add("start", pt(&e["start"])?)?,
                b: add("end", pt(&e["end"])?)?,
            }),
            "circle" => Some(CurveKind::Circle {
                c: add("center", pt(&e["center"])?)?,
                r: num(&e["radius"])?,
            }),
            "arc" => {
                let c = add("center", pt(&e["center"])?)?;
                let a = add("start", point_at(e, 0.)?)?;
                let b = add("end", point_at(e, 1.)?)?;
                Some(if e["ccw"] == false {
                    CurveKind::Arc { c, a: b, b: a }
                } else {
                    CurveKind::Arc { c, a, b }
                })
            }
            "bezier" => {
                let mut pts = vec![];
                for (i, p) in list(e, "points")?.iter().enumerate() {
                    pts.push(add(&format!("control:{i}"), pt(p)?)?)
                }
                if pts.len() < 2 || pts.len() > solidcraft_geom::MAX_BEZIER_CTRL {
                    return Err("Bézier requer entre 2 e 10 pontos de controle".into());
                }
                m.points.insert((id.clone(), "start".into()), pts[0]);
                m.points
                    .insert((id.clone(), "end".into()), pts[pts.len() - 1]);
                Some(CurveKind::Spline {
                    degree: (pts.len() - 1) as u8,
                    pts,
                    control: true,
                    periodic: false,
                })
            }
            _ => return Err("Entidade inválida".into()),
        };
        if let Some(curve) = curve {
            let idx = m.sk.add_curve(curve, Some(&id)).map_err(err)?;
            if let Some(c) = m.sk.curves.get_mut(idx) {
                c.construction = e["construction"] == true;
            }
            m.curves.insert(id, idx);
        }
    }
    Ok(m)
}
impl Mapping {
    fn curve(&self, v: &V) -> R<usize> {
        v.as_str()
            .and_then(|id| self.curves.get(id))
            .copied()
            .ok_or("Curva não encontrada".into())
    }
    fn point(&self, v: &V) -> R<usize> {
        let e = v["entity"].as_str().ok_or("Referência ausente")?;
        let p = v["point"].as_str().ok_or("Ponto ausente")?;
        self.points
            .get(&(e.into(), p.into()))
            .copied()
            .ok_or("Ponto não encontrado".into())
    }
}
fn solve(mut s: V) -> R<V> {
    // Fixed snapshots must be restored before translating into the native document.
    for c in list(&s, "constraints")?.clone() {
        if typ(&c) == "fixed" && c["geometry"].is_object() {
            if let Some(e) = s["entities"]
                .as_array_mut()
                .and_then(|es| es.iter_mut().find(|e| e["id"] == c["entity"]))
            {
                *e = c["geometry"].clone();
            }
        }
    }
    let mut m = mapped(&s)?;
    for c in list(&s, "constraints")? {
        let kind = match typ(c) {
            "horizontal" => C::Horizontal {
                l: m.curve(&c["entity"])?,
            },
            "vertical" => C::Vertical {
                l: m.curve(&c["entity"])?,
            },
            "coincident" => C::Coincident {
                p: m.point(&c["a"])?,
                q: m.point(&c["b"])?,
            },
            "coincidentOrigin" => C::Coincident {
                p: m.point(&c["point"])?,
                q: 0,
            },
            "pointOnAxis" => {
                if c["axis"] == "x" {
                    C::HorizontalPoints {
                        p: m.point(&c["point"])?,
                        q: 0,
                    }
                } else {
                    C::VerticalPoints {
                        p: m.point(&c["point"])?,
                        q: 0,
                    }
                }
            }
            "midpoint" => C::Midpoint {
                p: m.point(&c["point"])?,
                l: m.curve(&c["line"])?,
            },
            "parallel" => C::Parallel {
                a: m.curve(&c["first"])?,
                b: m.curve(&c["second"])?,
            },
            "perpendicular" => C::Perpendicular {
                a: m.curve(&c["first"])?,
                b: m.curve(&c["second"])?,
            },
            "collinear" => C::Collinear {
                a: m.curve(&c["first"])?,
                b: m.curve(&c["second"])?,
            },
            "equal" => C::Equal {
                a: m.curve(&c["first"])?,
                b: m.curve(&c["second"])?,
            },
            "concentric" => C::Concentric {
                a: m.curve(&c["first"])?,
                b: m.curve(&c["second"])?,
            },
            "tangent" => C::Tangent {
                a: m.curve(&c["first"])?,
                b: m.curve(&c["second"])?,
            },
            "fixed" => {
                let id = c["entity"].as_str().ok_or("ID ausente")?;
                for ((eid, _), i) in &m.points {
                    if eid == id {
                        if let Some(p) = m.sk.points.get_mut(*i) {
                            p.fixed = true;
                        }
                    }
                }
                if let Some(i) = m.curves.get(id) {
                    if let Some(curve) = m.sk.curves.get(*i) {
                        if let CurveKind::Circle { r, .. } = curve.kind {
                            m.sk.add_constraint(C::Radius { c: *i, value: r }, None)
                                .map_err(err)?;
                        }
                    }
                }
                continue;
            }
            _ => return Err(format!("Restrição não suportada: {}", typ(c))),
        };
        m.sk.add_constraint(kind, None).map_err(err)?;
    }
    for d in list(&s, "dimensions")? {
        if d["driving"] == false {
            continue;
        }
        let value = num(&d["value"])?;
        let kind = match typ(d) {
            "lineLength" => C::Length {
                l: m.curve(&d["entity"])?,
                value,
            },
            "circleRadius" | "arcRadius" => C::Radius {
                c: m.curve(&d["entity"])?,
                value,
            },
            "circleDiameter" | "arcDiameter" => C::Diameter {
                c: m.curve(&d["entity"])?,
                value,
            },
            "pointDistance" | "horizontalDistance" | "verticalDistance" => {
                let p = m.point(&d["a"])?;
                let q = m.point(&d["b"])?;
                let a = m.sk.point(p).ok_or("Ponto ausente")?;
                let b = m.sk.point(q).ok_or("Ponto ausente")?;
                match typ(d) {
                    "horizontalDistance" => C::DistanceX {
                        p,
                        q,
                        value: if b.x < a.x { -value } else { value },
                    },
                    "verticalDistance" => C::DistanceY {
                        p,
                        q,
                        value: if b.y < a.y { -value } else { value },
                    },
                    _ => C::Distance { p, q, value },
                }
            }
            "angleBetweenLines" => {
                let a = m.curve(&d["first"])?;
                let b = m.curve(&d["second"])?;
                let ea = list(&s, "entities")?
                    .iter()
                    .find(|e| e["id"] == d["first"])
                    .ok_or("Linha ausente")?;
                let eb = list(&s, "entities")?
                    .iter()
                    .find(|e| e["id"] == d["second"])
                    .ok_or("Linha ausente")?;
                let da = pt(&ea["end"])? - pt(&ea["start"])?;
                let db = pt(&eb["end"])? - pt(&eb["start"])?;
                C::Angle {
                    a,
                    b,
                    value: value.to_radians() * if da.cross(db) < 0. { -1. } else { 1. },
                    flip: false,
                }
            }
            _ => return Err(format!("Cota não suportada: {}", typ(d))),
        };
        m.sk.add_constraint(kind, None).map_err(err)?;
    }
    let report = solidcraft_sketch::solve(&mut m.sk);
    if report.ok() {
        for e in s["entities"].as_array_mut().ok_or("Entidades inválidas")? {
            let id = ident(e)?.to_owned();
            let get = |name: &str| -> R<Vec2> {
                let i = m
                    .points
                    .get(&(id.clone(), name.into()))
                    .ok_or("Ponto ausente")?;
                m.sk.point(*i).ok_or("Ponto ausente".into())
            };
            match typ(e) {
                "point" => e["position"] = xy(get("point")?),
                "line" => {
                    e["start"] = xy(get("start")?);
                    e["end"] = xy(get("end")?);
                }
                "circle" => {
                    e["center"] = xy(get("center")?);
                    if let Some(c) = m.curves.get(&id).and_then(|i| m.sk.curves.get(*i)) {
                        if let CurveKind::Circle { r, .. } = c.kind {
                            e["radius"] = json!(r);
                        }
                    }
                }
                "arc" => {
                    let c = get("center")?;
                    let a = get("start")?;
                    let b = get("end")?;
                    e["center"] = xy(c);
                    e["radius"] = json!(a.dist(c));
                    e["startAngle"] = json!((a - c).angle());
                    e["endAngle"] = json!((b - c).angle());
                }
                "bezier" => {
                    let n = list(e, "points")?.len();
                    for i in 0..n {
                        e["points"][i] = xy(get(&format!("control:{i}"))?)
                    }
                }
                _ => {}
            }
        }
    }
    let mut states: HashMap<_, _> = m
        .curves
        .iter()
        .map(|(id, i)| {
            (
                id.clone(),
                report.curve_determined.get(*i).copied().unwrap_or(false),
            )
        })
        .collect();
    for e in list(&s, "entities")? {
        if typ(e) == "point" {
            let i = m.point(&json!({"entity":e["id"],"point":"point"}))?;
            states.insert(
                ident(e)?.to_owned(),
                report.point_determined.get(i).copied().unwrap_or(false),
            );
        }
    }
    Ok(
        json!({"sketch":s,"converged":report.ok(),"residual":report.max_residual,"iterations":report.iterations,"dof":report.dof,"determined":states,"affectedIds":list(&s,"entities")?.iter().filter_map(|e|e["id"].as_str()).collect::<Vec<_>>(),"engine":"rust-solidcraft-0.15.0"}),
    )
}
fn profiles(s: &V) -> R<V> {
    let m = mapped(s)?;
    let regions = solidcraft_sketch::find_profiles(&m.sk);
    let loops: Vec<Vec<[f64; 2]>> = regions
        .iter()
        .map(|r| {
            r.region
                .outer
                .polyline(0.01)
                .into_iter()
                .map(|p| [p.x, p.y])
                .collect()
        })
        .collect();
    Ok(json!(loops))
}
fn import_loops(mut s: V) -> R<V> {
    let legacy = s["legacyLoops"].as_array().cloned().unwrap_or_default();
    let mut entities = list(&s, "entities")?.clone();
    let mut ids: std::collections::HashSet<String> = entities
        .iter()
        .filter_map(|e| e["id"].as_str().map(str::to_owned))
        .collect();
    let mut count = 0;
    for (li, l) in legacy.iter().enumerate() {
        let points = l.as_array().ok_or("Contorno inválido")?;
        if points.len() < 3 {
            return Err("Contorno aberto ou inválido".into());
        }
        for i in 0..points.len() {
            let a = pt(&points[i])?;
            let b = pt(&points[(i + 1) % points.len()])?;
            if a.dist(b) <= EPS {
                continue;
            }
            let mut id = format!("import-{li}-{i}");
            while ids.contains(&id) {
                id.push('x')
            }
            ids.insert(id.clone());
            if entities.len() >= 8000 {
                return Err("A imagem excede 8000 segmentos editáveis. Simplifique a vetorização ou divida em objetos.".into());
            }
            entities.push(json!({"id":id,"type":"line","start":xy(a),"end":xy(b),"construction":false,"imported":true,"sourceLoop":li}));
            count += 1;
        }
    }
    if entities.len() > 8000 {
        return Err("A imagem excede 8000 segmentos editáveis. Simplifique a vetorização ou divida em objetos.".into());
    }
    s["entities"] = json!(entities);
    s["legacyLoops"] = json!([]);
    Ok(json!({"sketch":s,"converted":count}))
}
fn validate(s: &V) -> R<()> {
    let es = list(s, "entities")?;
    if es.len() > 8000
        || list(s, "constraints")?.len() > 8000
        || list(s, "dimensions")?.len() > 8000
    {
        return Err("Sketch grande demais".into());
    }
    let mut ids = std::collections::HashSet::new();
    for e in es {
        let id = ident(e)?;
        if id.len() > 120 || !ids.insert(id) {
            return Err("ID inválido ou duplicado".into());
        }
        match typ(e) {
            "point" => {
                pt(&e["position"])?;
            }
            "line" => {
                pt(&e["start"])?;
                pt(&e["end"])?;
            }
            "circle" | "arc" => {
                shape(e)?;
                if typ(e) == "arc" {
                    sweep(e)?;
                }
            }
            "bezier" => {
                point_at(e, 0.5)?;
            }
            _ => return Err("Tipo inválido".into()),
        }
    }
    Ok(())
}
pub fn execute(input: &str) -> R<V> {
    if input.len() > 32 * 1024 * 1024 {
        return Err("Requisição grande demais".into());
    }
    let req: V = serde_json::from_str(input).map_err(err)?;
    let s = req["sketch"].clone();
    validate(&s)?;
    match req["command"].as_str().unwrap_or("") {
        "import" => import_loops(s),
        "solve" => solve(s),
        "profiles" => profiles(&s),
        "trim" | "extend" => edit(
            s,
            req["entity"].as_str().ok_or("ID ausente")?,
            pt(&req["point"])?,
            req["command"] == "extend",
        ),
        _ => Err("Comando desconhecido".into()),
    }
}
#[wasm_bindgen]
pub fn run(input: &str) -> String {
    match execute(input) {
        Ok(value) => json!({"ok":true,"value":value}).to_string(),
        Err(message) => json!({"ok":false,"error":message}).to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn sketch(entities: V) -> V {
        json!({"entities":entities,"constraints":[],"dimensions":[]})
    }
    #[test]
    fn trim_only_clicked_interval() {
        let s = sketch(json!([
   {"id":"a","type":"line","start":[0,0],"end":[30,0]},
   {"id":"b","type":"line","start":[10,-5],"end":[10,5]},
   {"id":"c","type":"line","start":[20,-5],"end":[20,5]}]));
        let out =
            execute(&json!({"command":"trim","sketch":s,"entity":"a","point":[15,0]}).to_string())
                .expect("valid sketch");
        assert_eq!(
            out["sketch"]["entities"]
                .as_array()
                .expect("entities")
                .len(),
            4
        );
        assert_eq!(out["sketch"]["entities"][0]["end"], json!([10.0, 0.0]));
        assert_eq!(out["sketch"]["entities"][1]["start"], json!([20.0, 0.0]));
    }
    #[test]
    fn malformed_input_does_not_trap() {
        for input in ["{}", "null", "{", "[]"] {
            assert!(execute(input).is_err());
        }
        let s = sketch(json!([{"id":"bad","type":"circle","center":[0,0],"radius":-1}]));
        assert!(execute(&json!({"command":"solve","sketch":s}).to_string()).is_err());
    }
}
