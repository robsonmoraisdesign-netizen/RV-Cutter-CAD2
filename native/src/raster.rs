//! Rust threshold vectorization: closed pixel boundaries become editable native curves.
use crate::Result;
use image::GenericImageView;
use std::collections::{HashMap, HashSet};
type P = (u32, u32);
fn dir(a: P, b: P) -> u8 {
    if b.0 > a.0 {
        0
    } else if b.1 > a.1 {
        1
    } else if b.0 < a.0 {
        2
    } else {
        3
    }
}
fn simplify(p: &[[f64; 2]], tol: f64) -> Vec<[f64; 2]> {
    if p.len() < 4 {
        return p.to_vec();
    }
    let last = p.len() - 1;
    let mut kept = vec![false; p.len()];
    kept[0] = true;
    kept[last] = true;
    let mut stack = vec![(0, last)];
    while let Some((a, b)) = stack.pop() {
        let dx = p[b][0] - p[a][0];
        let dy = p[b][1] - p[a][1];
        let len = dx * dx + dy * dy;
        let (mut best, mut at) = (tol * tol, None);
        for i in a + 1..b {
            let t = if len > 0.0 {
                (((p[i][0] - p[a][0]) * dx + (p[i][1] - p[a][1]) * dy) / len).clamp(0.0, 1.0)
            } else {
                0.0
            };
            let ex = p[i][0] - p[a][0] - dx * t;
            let ey = p[i][1] - p[a][1] - dy * t;
            let d = ex * ex + ey * ey;
            if d > best {
                best = d;
                at = Some(i);
            }
        }
        if let Some(i) = at {
            kept[i] = true;
            stack.push((a, i));
            stack.push((i, b));
        }
    }
    p.iter()
        .zip(kept)
        .filter_map(|(p, k)| k.then_some(*p))
        .collect()
}
#[derive(Clone, Copy, Debug)]
pub struct TraceOptions {
    pub threshold: u8,
    /// Maximum geometric deviation in tracing-grid pixels.
    pub simplify_px: f64,
    /// Remove closed rings smaller than this area; zero preserves all holes.
    pub min_area_px: f64,
}
impl Default for TraceOptions {
    fn default() -> Self {
        Self {
            threshold: 180,
            simplify_px: 1.0,
            min_area_px: 0.0,
        }
    }
}
pub fn trace(bytes: &[u8], size: f64, threshold: u8) -> Result<String> {
    trace_with_options(
        bytes,
        size,
        TraceOptions {
            threshold,
            ..Default::default()
        },
    )
}
pub fn trace_with_options(bytes: &[u8], size: f64, options: TraceOptions) -> Result<String> {
    if !options.simplify_px.is_finite()
        || !(0.1..=3.0).contains(&options.simplify_px)
        || !options.min_area_px.is_finite()
        || !(0.0..=1000.0).contains(&options.min_area_px)
    {
        return Err("Opções de vetorização inválidas.".into());
    }
    if !size.is_finite() || size <= 0.0 || size > 100000.0 {
        return Err("Tamanho inválido.".into());
    }
    // Decode at the source resolution, then adaptively reduce only the tracing grid.
    // Large high-resolution images therefore retain their intended dimensions in mm,
    // without creating millions of individual Sketch entities or unbounded memory use.
    const MAX_SOURCE_PIXELS: u64 = 64_000_000;
    const MAX_TRACE_PIXELS: u64 = 4_000_000;
    let (source_w, source_h) = image::ImageReader::new(std::io::Cursor::new(bytes))
        .with_guessed_format()
        .map_err(|e| e.to_string())?
        .into_dimensions()
        .map_err(|e| e.to_string())?;
    if source_w == 0
        || source_h == 0
        || u64::from(source_w) * u64::from(source_h) > MAX_SOURCE_PIXELS
    {
        return Err(
            "Imagem acima de 64 milhões de pixels: reduza a resolução para importar com segurança."
                .into(),
        );
    }
    let mut reader = image::ImageReader::new(std::io::Cursor::new(bytes))
        .with_guessed_format()
        .map_err(|e| e.to_string())?;
    let mut limits = image::Limits::default();
    limits.max_image_width = Some(16_384);
    limits.max_image_height = Some(16_384);
    limits.max_alloc = Some(384 * 1024 * 1024);
    reader.limits(limits);
    let decoded = reader.decode().map_err(|e| e.to_string())?;
    let (original_w, original_h) = decoded.dimensions();
    // Composite BEFORE filtering, so hidden RGB cannot bleed into visible edges.
    let gray = image::GrayImage::from_fn(original_w, original_h, |x, y| {
        let p = decoded.get_pixel(x, y).0;
        let alpha = f64::from(p[3]) / 255.0;
        let luminance =
            0.2126 * f64::from(p[0]) + 0.7152 * f64::from(p[1]) + 0.0722 * f64::from(p[2]);
        image::Luma([(luminance * alpha + 255.0 * (1.0 - alpha)).round() as u8])
    });
    drop(decoded);
    let image = if u64::from(original_w) * u64::from(original_h) > MAX_TRACE_PIXELS {
        let factor =
            (MAX_TRACE_PIXELS as f64 / (f64::from(original_w) * f64::from(original_h))).sqrt();
        let target_w = (f64::from(original_w) * factor).floor().max(1.0) as u32;
        let target_h = (f64::from(original_h) * factor).floor().max(1.0) as u32;
        image::imageops::resize(
            &gray,
            target_w,
            target_h,
            image::imageops::FilterType::Triangle,
        )
    } else {
        gray
    };
    let (w, h) = image.dimensions();
    let black = |x: i64, y: i64| {
        if x < 0 || y < 0 || x >= i64::from(w) || y >= i64::from(h) {
            return false;
        }
        image.get_pixel(x as u32, y as u32).0[0] < options.threshold
    };
    let mut edges = HashSet::new();
    let mut outgoing: HashMap<P, Vec<P>> = HashMap::new();
    for y in 0..h {
        for x in 0..w {
            if !black(i64::from(x), i64::from(y)) {
                continue;
            }
            for (a, b, nx, ny) in [
                ((x, y), (x + 1, y), i64::from(x), i64::from(y) - 1),
                ((x + 1, y), (x + 1, y + 1), i64::from(x) + 1, i64::from(y)),
                ((x + 1, y + 1), (x, y + 1), i64::from(x), i64::from(y) + 1),
                ((x, y + 1), (x, y), i64::from(x) - 1, i64::from(y)),
            ] {
                if !black(nx, ny) {
                    edges.insert((a, b));
                    outgoing.entry(a).or_default().push(b);
                }
            }
            if edges.len() > 300000 {
                return Err("Imagem detalhada demais: reduza ruído ou resolução.".into());
            }
        }
    }
    if edges.is_empty() {
        return Err("Nenhum contorno escuro encontrado.".into());
    }
    let mut rings = Vec::new();
    let mut starts: Vec<_> = edges.iter().copied().collect();
    starts.sort_unstable();
    for (a, b) in starts {
        if !edges.contains(&(a, b)) {
            continue;
        }
        let mut ring = vec![a];
        let (mut prev, mut p) = (a, b);
        edges.remove(&(a, b));
        while p != a {
            ring.push(p);
            let heading = dir(prev, p);
            let q = outgoing
                .get(&p)
                .and_then(|v| {
                    v.iter()
                        .copied()
                        .filter(|q| edges.contains(&(p, *q)))
                        .min_by_key(|q| match (dir(p, *q) + 4 - heading) % 4 {
                            1 => 0,
                            0 => 1,
                            3 => 2,
                            _ => 3,
                        })
                })
                .ok_or("Contorno não fecha.")?;
            edges.remove(&(p, q));
            prev = p;
            p = q;
            if ring.len() > 300000 {
                return Err("Contorno excede o limite.".into());
            }
        }
        let twice_area: f64 = ring
            .iter()
            .zip(ring.iter().cycle().skip(1))
            .take(ring.len())
            .map(|(a, b)| f64::from(a.0) * f64::from(b.1) - f64::from(b.0) * f64::from(a.1))
            .sum();
        if ring.len() >= 4 && twice_area.abs() * 0.5 >= options.min_area_px {
            rings.push(ring);
        }
        if rings.len() > 1000 {
            return Err("Mais de 1000 regiões: remova o ruído.".into());
        }
    }
    let minx = rings
        .iter()
        .flatten()
        .map(|p| p.0)
        .min()
        .ok_or("Sem área")?;
    let maxx = rings
        .iter()
        .flatten()
        .map(|p| p.0)
        .max()
        .ok_or("Sem área")?;
    let miny = rings
        .iter()
        .flatten()
        .map(|p| p.1)
        .min()
        .ok_or("Sem área")?;
    let maxy = rings
        .iter()
        .flatten()
        .map(|p| p.1)
        .max()
        .ok_or("Sem área")?;
    let extent = (maxx - minx).max(maxy - miny);
    if extent == 0 {
        return Err("Imagem sem área.".into());
    }
    let scale = size / f64::from(extent);
    let cx = f64::from(minx + maxx) / 2.0;
    let cy = f64::from(miny + maxy) / 2.0;
    let source: Vec<Vec<[f64; 2]>> = rings
        .iter()
        .map(|ring| {
            ring.iter()
                .map(|&(x, y)| [(f64::from(x) - cx) * scale, (f64::from(y) - cy) * scale])
                .collect()
        })
        .collect();
    // Relax only when the requested precision would reject the entire image.
    // Bound the extra deviation to three tracing pixels; retain every ring.
    let mut tolerance = options.simplify_px;
    loop {
        let polygons: Vec<_> = source
            .iter()
            .map(|ring| simplify_ring(ring, scale * tolerance))
            .collect();
        let count: usize = polygons.iter().map(Vec::len).sum();
        if count <= 8000 {
            return polygons_svg(&polygons);
        }
        if tolerance >= 3.0 {
            return Err(format!(
                "Contorno ainda tem {count} vértices após simplificação. Aumente Ruído ou recorte a região desejada."
            ));
        }
        tolerance = (tolerance * 1.5).min(3.0);
    }
}

// Retain extrema so simplification cannot change the selected physical size.
fn simplify_ring(ring: &[[f64; 2]], tolerance: f64) -> Vec<[f64; 2]> {
    if ring.len() < 4 {
        return ring.to_vec();
    }
    let mut anchors = vec![0];
    for axis in 0..2 {
        if let Some((i, _)) = ring
            .iter()
            .enumerate()
            .min_by(|a, b| a.1[axis].total_cmp(&b.1[axis]))
        {
            anchors.push(i);
        }
        if let Some((i, _)) = ring
            .iter()
            .enumerate()
            .max_by(|a, b| a.1[axis].total_cmp(&b.1[axis]))
        {
            anchors.push(i);
        }
    }
    anchors.sort_unstable();
    anchors.dedup();
    let mut out = Vec::new();
    for (position, &start) in anchors.iter().enumerate() {
        let end = anchors.get(position + 1).copied().unwrap_or(ring.len());
        let mut chain = ring[start..end].to_vec();
        chain.push(ring[end % ring.len()]);
        let mut reduced = simplify(&chain, tolerance);
        reduced.pop();
        out.extend(reduced);
    }
    let area = |points: &[[f64; 2]]| -> f64 {
        points
            .iter()
            .zip(points.iter().cycle().skip(1))
            .take(points.len())
            .map(|(a, b)| a[0] * b[1] - b[0] * a[1])
            .sum()
    };
    if out.len() < 3 || area(&out) * area(ring) <= 0.0 {
        ring.to_vec()
    } else {
        out
    }
}

pub fn polygons_svg(polygons: &[Vec<[f64; 2]>]) -> Result<String> {
    if polygons.iter().map(Vec::len).sum::<usize>() > 8000 {
        return Err("Limite: 8000 vértices editáveis.".into());
    }
    let points: Vec<_> = polygons.iter().flatten().collect();
    if points.is_empty() {
        return Err("Sem contornos.".into());
    }
    let minx = points.iter().map(|p| p[0]).fold(f64::INFINITY, f64::min);
    let maxx = points
        .iter()
        .map(|p| p[0])
        .fold(f64::NEG_INFINITY, f64::max);
    let miny = points.iter().map(|p| p[1]).fold(f64::INFINITY, f64::min);
    let maxy = points
        .iter()
        .map(|p| p[1])
        .fold(f64::NEG_INFINITY, f64::max);
    let (w, h) = (maxx - minx, maxy - miny);
    if !w.is_finite() || !h.is_finite() || w <= 0.0 || h <= 0.0 {
        return Err("Contorno sem área.".into());
    }
    let mut svg = format!(
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{w}mm\" height=\"{h}mm\" viewBox=\"{minx} {miny} {w} {h}\">"
    );
    for ring in polygons {
        if let Some(a) = ring.first() {
            svg.push_str(&format!(
                "<path fill=\"none\" stroke=\"black\" d=\"M{} {}",
                a[0], a[1]
            ));
            for p in ring.iter().skip(1) {
                svg.push_str(&format!(" L{} {}", p[0], p[1]));
            }
            svg.push_str(" Z\"/>");
        }
    }
    svg.push_str("</svg>");
    Ok(svg)
}
