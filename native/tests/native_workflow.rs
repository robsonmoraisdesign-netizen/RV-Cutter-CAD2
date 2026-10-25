use rv_cutter_native::{Import, demo, import_into, legacy_outlines, raster};
use serde_json::json;
use solidcraft_engine::{Session, io, sketch::Shape};
fn volume(s: &Session) -> f64 {
    s.model
        .state()
        .bodies
        .iter()
        .map(|b| b.body.volume_at(0.01).expect("closed B-rep"))
        .sum()
}
fn near(a: f64, b: f64) {
    assert!((a - b).abs() < 0.01, "{a} != {b}");
}
#[test]
fn parameter_changes_rebuild_brep_and_survive_save() {
    let mut s = Session::default();
    demo(&mut s).unwrap();
    near(volume(&s), 28800.0);
    s.execute(
        "parameters.change",
        &json!({"name":"altura_rv","expression":"20 mm"}),
    )
    .unwrap();
    near(volume(&s), 48000.0);
    s.execute(
        "parameters.change",
        &json!({"name":"largura_rv","expression":"80 mm"}),
    )
    .unwrap();
    near(volume(&s), 64000.0);
    s.execute("edit.undo", &json!({})).unwrap();
    near(volume(&s), 48000.0);
    s.execute("edit.redo", &json!({})).unwrap();
    near(volume(&s), 64000.0);
    let bytes = io::write_design_container(&s.doc).unwrap();
    let reopened = Session::new(io::read_design(&bytes).unwrap());
    near(volume(&reopened), 64000.0);
}
#[test]
fn png_becomes_native_sketch_and_brep_with_hole() {
    let mut img = image::RgbaImage::from_pixel(20, 20, image::Rgba([255, 255, 255, 255]));
    for y in 2..18 {
        for x in 2..18 {
            img.put_pixel(x, y, image::Rgba([0, 0, 0, 255]));
        }
    }
    for y in 6..14 {
        for x in 6..14 {
            img.put_pixel(x, y, image::Rgba([255, 255, 255, 255]));
        }
    }
    let mut png = std::io::Cursor::new(Vec::new());
    img.write_to(&mut png, image::ImageFormat::Png).unwrap();
    let svg = raster::trace(png.get_ref(), 40.0, 180).unwrap();
    assert_eq!(svg.matches("<path").count(), 2);
    let mut s = Session::default();
    import_into(
        &mut s,
        &[Import {
            name: "Imagem".into(),
            svg,
        }],
    )
    .unwrap();
    let id = s.active_sketch.unwrap();
    assert_eq!(s.doc.sketch(id).unwrap().curves.len(), 8);
    let sk = s.doc.sketch(id).unwrap();
    let mut lo = [f64::INFINITY; 2];
    for i in 0..sk.curves.len() {
        if let Shape::Line { a, b } = sk.shape(i).unwrap() {
            for p in [a, b] {
                lo[0] = lo[0].min(p.x);
                lo[1] = lo[1].min(p.y);
            }
        }
    }
    s.execute("sketch.finish", &json!({})).unwrap();
    s.execute("solid.extrude",&json!({"sketch":id,"distance":5,"operation":"new","profiles":[{"point":[lo[0]+1.0,lo[1]+1.0]}]})).unwrap();
    near(volume(&s), 6000.0);
}
#[test]
fn imported_curves_trim_and_failed_import_rolls_back() {
    let svg =
        raster::polygons_svg(&[vec![[0.0, 0.0], [40.0, 0.0], [40.0, 30.0], [0.0, 30.0]]]).unwrap();
    let mut s = Session::default();
    import_into(
        &mut s,
        &[Import {
            name: "Contorno".into(),
            svg: svg.clone(),
        }],
    )
    .unwrap();
    assert_eq!(s.undo.len(), 1);
    let id = s.active_sketch.unwrap();
    let sk = s.doc.sketch(id).unwrap();
    let curve = sk.curves[0].id.clone();
    let Shape::Line { a, b } = sk.shape(0).unwrap() else {
        panic!("line")
    };
    let mid = (a + b) * 0.5;
    let d = b - a;
    let n = solidcraft_engine::geom::Vec2::new(-d.y, d.x) * 0.25;
    s.execute(
        "sketch.line",
        &json!({"points":[[mid.x-n.x,mid.y-n.y],[mid.x+n.x,mid.y+n.y]]}),
    )
    .unwrap();
    let at = a.lerp(b, 0.75);
    s.execute("sketch.trim", &json!({"curve":curve,"at":[at.x,at.y]}))
        .unwrap();
    let sk = s.doc.sketch(id).unwrap();
    let Shape::Line { a: x, b: y } = sk.shape(sk.curve_index(&curve).unwrap()).unwrap() else {
        panic!("line")
    };
    near(x.dist(y), a.dist(b) * 0.5);
    s.execute("edit.undo", &json!({})).unwrap();
    let sk = s.doc.sketch(id).unwrap();
    let Shape::Line { a: x, b: y } = sk.shape(sk.curve_index(&curve).unwrap()).unwrap() else {
        panic!("line")
    };
    near(x.dist(y), a.dist(b));
    let before = io::write_design(&s.doc);
    let undo = s.undo.len();
    assert!(
        import_into(
            &mut s,
            &[
                Import {
                    name: "Bom".into(),
                    svg
                },
                Import {
                    name: "Ruim".into(),
                    svg: "<svg></svg>".into()
                }
            ]
        )
        .is_err()
    );
    assert_eq!(io::write_design(&s.doc), before);
    assert_eq!(s.undo.len(), undo);
}
#[test]
fn legacy_rv_and_invalid_input() {
    let rv = json!({"format":"rv-cad-13","objects":[{"name":"RV","params":{"size":50},"loops":[[[-0.5,-0.5],[0.5,-0.5],[0.5,0.5],[-0.5,0.5]]]}]});
    let imports = legacy_outlines(rv.to_string().as_bytes()).unwrap();
    let mut s = Session::default();
    import_into(&mut s, &imports).unwrap();
    assert_eq!(
        s.doc.sketch(s.active_sketch.unwrap()).unwrap().curves.len(),
        4
    );
    assert!(legacy_outlines(b"{}").is_err());
    assert!(raster::trace(b"invalid", 75.0, 180).is_err());
}
