//! Procedural closed borders, in millimetres. No UI or JavaScript dependency.
//! This module is deliberately independent of the CAD solver: callers keep the
//! source ring and parameters, and regenerate instead of modifying the source.
use crate::Result;
pub type Point = [f64; 2];
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Pattern {
    Smooth,
    Wave,
    Saw,
}
#[derive(Clone, Copy, Debug)]
pub struct Border {
    pub pattern: Pattern,
    pub repeats: usize,
    /// Positive = outward, negative = inward. Zero retains the source.
    pub depth_mm: f64,
}
impl Default for Border {
    fn default() -> Self {
        Self {
            pattern: Pattern::Smooth,
            repeats: 24,
            depth_mm: 0.5,
        }
    }
}
fn cross(a: Point, b: Point, c: Point) -> f64 {
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
}
pub fn area(ring: &[Point]) -> f64 {
    ring.iter()
        .zip(ring.iter().cycle().skip(1))
        .take(ring.len())
        .map(|(a, b)| a[0] * b[1] - b[0] * a[1])
        .sum::<f64>()
        * 0.5
}
fn distance(a: Point, b: Point) -> f64 {
    (a[0] - b[0]).hypot(a[1] - b[1])
}
fn on_segment(a: Point, b: Point, p: Point) -> bool {
    cross(a, b, p).abs() <= 1e-10
        && (0..2).all(|i| p[i] >= a[i].min(b[i]) - 1e-9 && p[i] <= a[i].max(b[i]) + 1e-9)
}
fn intersects(a: Point, b: Point, c: Point, d: Point) -> bool {
    let (x, y, z, w) = (
        cross(a, b, c),
        cross(a, b, d),
        cross(c, d, a),
        cross(c, d, b),
    );
    ((x > 0.0 && y < 0.0 || x < 0.0 && y > 0.0) && (z > 0.0 && w < 0.0 || z < 0.0 && w > 0.0))
        || on_segment(a, b, c)
        || on_segment(a, b, d)
        || on_segment(c, d, a)
        || on_segment(c, d, b)
}
/// Reject invalid topology before passing a ring to the solid kernel.
pub fn validate(ring: &[Point]) -> Result<()> {
    if !(3..=8000).contains(&ring.len())
        || ring
            .iter()
            .flatten()
            .any(|x| !x.is_finite() || x.abs() > 1e6)
    {
        return Err("Contorno inválido ou acima de 8000 pontos.".into());
    }
    if area(ring).abs() < 1e-8 {
        return Err("Contorno sem área.".into());
    }
    for i in 0..ring.len() {
        let j = (i + 1) % ring.len();
        if distance(ring[i], ring[j]) < 1e-7 {
            return Err("Contorno contém segmento nulo.".into());
        }
        for k in i + 1..ring.len() {
            let l = (k + 1) % ring.len();
            if j == k || l == i {
                continue;
            }
            if intersects(ring[i], ring[j], ring[k], ring[l]) {
                return Err(
                    "A borda cruza ou toca a si mesma. Reduza a profundidade ou ajuste o contorno."
                        .into(),
                );
            }
        }
    }
    Ok(())
}
/// Distribute complete cycles by arc length, including the closure. Sampling
/// includes original corners; no bounding-box or convex-hull approximation.
pub fn generate(source: &[Point], settings: Border) -> Result<Vec<Point>> {
    validate(source)?;
    if !(1..=80).contains(&settings.repeats)
        || !settings.depth_mm.is_finite()
        || settings.depth_mm.abs() > 20.0
    {
        return Err("Use de 1 a 80 repetições e profundidade entre -20 e 20 mm.".into());
    }
    if settings.pattern == Pattern::Smooth || settings.depth_mm == 0.0 {
        return Ok(source.to_vec());
    }
    let mut lengths = vec![0.0];
    let mut perimeter = 0.0;
    for (a, b) in source
        .iter()
        .zip(source.iter().cycle().skip(1))
        .take(source.len())
    {
        perimeter += distance(*a, *b);
        lengths.push(perimeter);
    }
    let count = settings.repeats * 16;
    let mut samples: Vec<f64> = (0..count)
        .map(|i| perimeter * i as f64 / count as f64)
        .collect();
    samples.extend(lengths.iter().take(source.len()).copied());
    samples.sort_by(f64::total_cmp);
    samples.dedup_by(|a, b| (*a - *b).abs() < 1e-8);
    if samples.len() > 8000 {
        return Err("Borda detalhada demais: reduza as repetições.".into());
    }
    let orientation = area(source).signum();
    let normal = |i: usize| {
        let a = source[i];
        let b = source[(i + 1) % source.len()];
        let len = distance(a, b);
        [
            orientation * (b[1] - a[1]) / len,
            -orientation * (b[0] - a[0]) / len,
        ]
    };
    let mut result = Vec::with_capacity(samples.len());
    let mut edge = 0;
    for s in samples {
        while edge + 1 < source.len() && lengths[edge + 1] <= s {
            edge += 1;
        }
        let a = source[edge];
        let b = source[(edge + 1) % source.len()];
        let t = (s - lengths[edge]) / (lengths[edge + 1] - lengths[edge]);
        let phase = (s / perimeter * settings.repeats as f64).fract();
        let wave = match settings.pattern {
            Pattern::Wave => (1.0 - (phase * std::f64::consts::TAU).cos()) * 0.5,
            Pattern::Saw => 1.0 - (2.0 * phase - 1.0).abs(),
            Pattern::Smooth => 0.0,
        };
        // Interpolate corner bisectors for continuous displacement across seams.
        let n = normal(edge);
        let prev = normal((edge + source.len() - 1) % source.len());
        let next = normal((edge + 1) % source.len());
        let blend = [
            (prev[0] + n[0]) * (1.0 - t) + (n[0] + next[0]) * t,
            (prev[1] + n[1]) * (1.0 - t) + (n[1] + next[1]) * t,
        ];
        let norm = blend[0].hypot(blend[1]);
        if norm < 1e-8 {
            return Err("Canto muito fechado para personalizar.".into());
        }
        let depth = wave * settings.depth_mm;
        result.push([
            a[0] + (b[0] - a[0]) * t + blend[0] / norm * depth,
            a[1] + (b[1] - a[1]) * t + blend[1] / norm * depth,
        ]);
    }
    validate(&result)?;
    Ok(result)
}
/// Reconstruct closed polygon rings from unordered raster Sketch segments.
/// Quantization is used only for connectivity (one millionth of a millimetre).
/// Open paths and branching vertices are rejected instead of guessed closed.
pub fn rings_from_lines(lines: &[(Point, Point)]) -> Result<Vec<Vec<Point>>> {
    use std::collections::BTreeMap;
    if lines.is_empty() || lines.len() > 8000 {
        return Err("Use um Sketch com até 8000 linhas.".into());
    }
    let key = |p: Point| ((p[0] * 1e6).round() as i64, (p[1] * 1e6).round() as i64);
    let mut vertices = BTreeMap::new();
    let mut points = Vec::new();
    let mut adjacency: Vec<Vec<usize>> = Vec::new();
    for &(a, b) in lines {
        if [a, b]
            .iter()
            .flatten()
            .any(|v| !v.is_finite() || v.abs() > 1e6)
        {
            return Err("Coordenada inválida no Sketch.".into());
        }
        let mut ids = Vec::new();
        for p in [a, b] {
            let next = points.len();
            let id = *vertices.entry(key(p)).or_insert(next);
            if id == next {
                points.push(p);
                adjacency.push(Vec::new());
            }
            ids.push(id);
        }
        if ids[0] == ids[1] {
            return Err("Segmento menor que a precisão de conexão.".into());
        }
        adjacency[ids[0]].push(ids[1]);
        adjacency[ids[1]].push(ids[0]);
    }
    if adjacency.iter().any(|v| v.len() != 2 || v[0] == v[1]) {
        return Err(
            "Contorno aberto, duplicado ou ramificado. Corrija as conexões do Sketch.".into(),
        );
    }
    let mut seen = vec![false; points.len()];
    let mut rings = Vec::new();
    for start in 0..points.len() {
        if seen[start] {
            continue;
        }
        let mut ring = Vec::new();
        let mut previous = usize::MAX;
        let mut current = start;
        loop {
            if seen[current] {
                if current != start {
                    return Err("Conexão ambígua no contorno.".into());
                }
                break;
            }
            seen[current] = true;
            ring.push(points[current]);
            let next = adjacency[current]
                .iter()
                .copied()
                .find(|&id| id != previous)
                .ok_or("Contorno interrompido.")?;
            previous = current;
            current = next;
        }
        validate(&ring)?;
        rings.push(ring);
    }
    rings.sort_by(|a, b| area(b).abs().total_cmp(&area(a).abs()));
    Ok(rings)
}
#[cfg(test)]
mod tests {
    use super::*;
    fn square() -> Vec<Point> {
        vec![[0., 0.], [20., 0.], [20., 20.], [0., 20.]]
    }
    #[test]
    fn reconstructs_outer_and_hole_in_area_order() {
        let lines = vec![
            ([20., 20.], [0., 20.]),
            ([0., 0.], [20., 0.]),
            ([0., 20.], [0., 0.]),
            ([20., 0.], [20., 20.]),
            ([5., 5.], [6., 5.]),
            ([6., 5.], [6., 6.]),
            ([6., 6.], [5., 6.]),
            ([5., 6.], [5., 5.]),
        ];
        let rings = rings_from_lines(&lines).unwrap();
        assert_eq!(rings.len(), 2);
        assert_eq!(area(&rings[0]).abs(), 400.);
        assert!(rings_from_lines(&lines[..3]).is_err());
    }
    #[test]
    fn smooth_preserves_source() {
        let s = square();
        assert_eq!(generate(&s, Border::default()).unwrap(), s);
    }
    #[test]
    fn patterns_close_without_duplicate_endpoint() {
        for pattern in [Pattern::Wave, Pattern::Saw] {
            let p = generate(
                &square(),
                Border {
                    pattern,
                    repeats: 8,
                    depth_mm: 0.5,
                },
            )
            .unwrap();
            validate(&p).unwrap();
            assert!(area(&p) > 400.);
            assert_ne!(p.first(), p.last());
        }
    }
    #[test]
    fn winding_keeps_outward_direction() {
        let mut s = square();
        s.reverse();
        let p = generate(
            &s,
            Border {
                pattern: Pattern::Wave,
                repeats: 8,
                depth_mm: 0.5,
            },
        )
        .unwrap();
        assert!(area(&p) < -400.);
    }
    #[test]
    fn rejects_crossings_and_hostile_inputs() {
        assert!(validate(&[[0., 0.], [20., 20.], [0., 20.], [20., 0.]]).is_err());
        assert!(
            generate(
                &square(),
                Border {
                    repeats: usize::MAX,
                    ..Border::default()
                }
            )
            .is_err()
        );
        assert!(
            generate(
                &square(),
                Border {
                    depth_mm: f64::NAN,
                    ..Border::default()
                }
            )
            .is_err()
        );
    }
    #[test]
    fn inward_decreases_area() {
        let p = generate(
            &square(),
            Border {
                pattern: Pattern::Wave,
                repeats: 8,
                depth_mm: -0.5,
            },
        )
        .unwrap();
        assert!(area(&p) < 400.);
    }
}
