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

#[test]
fn automatic_constraints_and_native_recipe_recompute() {
    let mut s = Session::default();
    s.execute("sketch.create", &json!({"plane":"XY"})).unwrap();
    s.execute(
        "sketch.line",
        &json!({"points":[[0,0],[40,0.004],[40.003,30],[0,30.002]],"closed":true}),
    )
    .unwrap();
    let result = s.execute("sketch.auto_constrain", &json!({})).unwrap();
    assert_eq!(result["dof"], 0);
    let recipe = serde_json::from_str(include_str!("../examples/placa-parametrica.json")).unwrap();
    let undo = s.undo.len();
    rv_cutter_native::recipe::apply(&mut s, &recipe).unwrap();
    assert_eq!(s.undo.len(), undo + 1);
    near(volume(&s), 12000.0);
    s.execute(
        "parameters.change",
        &json!({"name":"largura_placa","expression":"80 mm"}),
    )
    .unwrap();
    near(volume(&s), 16000.0);
    let before = io::write_design(&s.doc);
    let mut failed = recipe.clone();
    failed["commands"][0]["params"]["name"] = json!("parametro_novo");
    assert!(rv_cutter_native::recipe::apply(&mut s, &failed).is_err());
    assert_eq!(io::write_design(&s.doc), before);
    assert!(rv_cutter_native::recipe::apply(&mut s, &json!({"format":"rv-parametric-recipe-1","commands":[{"command":"file.open","params":{}}]})).is_err());
}

#[test]
fn raster_over_four_megapixels_downsamples_and_keeps_physical_size() {
    let mut img = image::RgbaImage::from_pixel(2050, 2050, image::Rgba([255, 255, 255, 255]));
    for y in 20..2030 {
        for x in 20..2030 {
            img.put_pixel(x, y, image::Rgba([0, 0, 0, 255]));
        }
    }
    let mut png = std::io::Cursor::new(Vec::new());
    img.write_to(&mut png, image::ImageFormat::Png).unwrap();
    let svg = raster::trace(png.get_ref(), 75.0, 180).unwrap();
    assert_eq!(svg.matches("<path").count(), 1);
    assert!(svg.contains("mm"));
}

#[test]
fn importing_raster_adds_a_driving_dimension_to_longest_axis() {
    let svg = raster::polygons_svg(&[vec![
        [-20.0, -10.0],
        [20.0, -10.0],
        [20.0, 10.0],
        [-20.0, 10.0],
    ]])
    .unwrap();
    let mut s = Session::default();
    rv_cutter_native::import_into_with_size(
        &mut s,
        &[Import {
            name: "Logo importada".into(),
            svg,
        }],
        Some(75.0),
    )
    .unwrap();
    let sk = s.doc.sketch(s.active_sketch.unwrap()).unwrap();
    assert!(sk.constraints.iter().any(|c| c.kind.is_dimension()));
    let bounds: Vec<_> = (0..sk.curves.len()).filter_map(|i| sk.shape(i)).collect();
    assert_eq!(bounds.len(), 4);
    assert_eq!(s.undo.len(), 1);
}

#[test]
fn cookie_cutter_creates_parametric_thin_wall_and_base() {
    let mut s = Session::default();
    s.execute("sketch.create", &json!({"plane":"XY","name":"Biscoito"}))
        .unwrap();
    s.execute(
        "sketch.rectangle.two_point",
        &json!({"p0":[-20,-15],"p1":[20,15]}),
    )
    .unwrap();
    let id = s.active_sketch.unwrap();
    let before = io::write_design(&s.doc);
    let cfg = rv_cutter_native::cutter::CutterSettings::default();
    rv_cutter_native::cutter::create(&mut s, &cfg).unwrap();
    let initial = volume(&s);
    assert!(initial > 0.0, "Cortador nao criou B-rep fechado");
    assert_eq!(s.model.state().bodies.len(), 1);
    s.execute(
        "parameters.change",
        &json!({
            "name": format!("rv_lamina_altura_{id}"),
            "expression": "20 mm"
        }),
    )
    .unwrap();
    assert!(volume(&s) > initial);
    // The manufacturing generator is a single undo operation, distinct from edits.
    s.execute("edit.undo", &json!({})).unwrap();
    s.execute("edit.undo", &json!({})).unwrap();
    assert_eq!(io::write_design(&s.doc), before);
    assert!(
        (rv_cutter_native::cutter::CutterSettings {
            blade_height_mm: 3.0,
            ..cfg
        })
        .validate()
        .is_err()
    );
}

#[test]
fn proportional_import_rebuilds_cutter_and_survives_reopen() {
    let mut s = Session::default();
    let svg = raster::polygons_svg(&[vec![[0., 0.], [40., 0.], [40., 20.], [0., 20.]]]).unwrap();
    rv_cutter_native::import_into_with_size(
        &mut s,
        &[Import {
            name: "Proporcional".into(),
            svg,
        }],
        Some(75.),
    )
    .unwrap();
    let id = s.active_sketch.unwrap();
    let lengths = |s: &Session| -> Vec<f64> {
        let state = s.model.state();
        let sk = state.sketch(id).unwrap();
        (0..sk.curves.len())
            .filter_map(|i| match sk.shape(i)? {
                Shape::Line { a, b } => Some(a.dist(b)),
                _ => None,
            })
            .collect()
    };
    let original = lengths(&s);
    rv_cutter_native::cutter::create(&mut s, &Default::default()).unwrap();
    let original_volume = volume(&s);
    s.execute(
        "parameters.change",
        &json!({"name": format!("rv_tamanho_{id}"), "expression":"112.5 mm"}),
    )
    .unwrap();
    for (before, after) in original.iter().zip(lengths(&s)) {
        near(before * 1.5, after);
    }
    assert!(volume(&s) > original_volume);
    let bytes = io::write_design_container(&s.doc).unwrap();
    let reopened = Session::new(io::read_design(&bytes).unwrap());
    near(volume(&reopened), volume(&s));
    for (before, after) in original.iter().zip(lengths(&reopened)) {
        near(before * 1.5, after);
    }
}

#[test]
fn raster_transparency_noise_and_invalid_options() {
    let mut img = image::RgbaImage::from_pixel(32, 32, image::Rgba([0, 0, 0, 0]));
    for y in 4..28 {
        for x in 4..28 {
            img.put_pixel(x, y, image::Rgba([0, 0, 0, 255]));
        }
    }
    for y in 12..20 {
        for x in 12..20 {
            img.put_pixel(x, y, image::Rgba([0, 0, 0, 0]));
        }
    }
    img.put_pixel(1, 1, image::Rgba([0, 0, 0, 255]));
    let mut png = std::io::Cursor::new(Vec::new());
    img.write_to(&mut png, image::ImageFormat::Png).unwrap();
    assert_eq!(
        raster::trace(png.get_ref(), 75., 180)
            .unwrap()
            .matches("<path")
            .count(),
        3
    );
    let options = raster::TraceOptions {
        min_area_px: 2.,
        ..Default::default()
    };
    assert_eq!(
        raster::trace_with_options(png.get_ref(), 75., options)
            .unwrap()
            .matches("<path")
            .count(),
        2
    );
    assert!(
        raster::trace_with_options(
            png.get_ref(),
            75.,
            raster::TraceOptions {
                simplify_px: f64::NAN,
                ..options
            }
        )
        .is_err()
    );
}
