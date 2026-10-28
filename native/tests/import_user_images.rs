//! Run locally with user-provided images; private images are not repository fixtures.
use rv_cutter_native::{import_into_report, prepare_import};
use solidcraft_engine::{Session, io};
#[test]
#[ignore = "Set RV_IMPORT_INPUTS to a JSON array of local PNG/JPG paths"]
fn user_images_import_and_reopen() {
    let paths: Vec<String> =
        serde_json::from_str(&std::env::var("RV_IMPORT_INPUTS").expect("input paths")).unwrap();
    assert!(!paths.is_empty());
    for path in paths {
        let start = std::time::Instant::now();
        let imports = prepare_import(std::path::Path::new(&path), 75., 180).unwrap();
        let trace_time = start.elapsed();
        let mut s = Session::default();
        let report = import_into_report(&mut s, &imports, Some(75.)).unwrap();
        let id = s.active_sketch.unwrap();
        assert!(report.curves > 0 && report.curves <= 8000);
        let bytes = io::write_design_container(&s.doc).unwrap();
        let reopened = Session::new(io::read_design(&bytes).unwrap());
        assert_eq!(reopened.doc.sketch(id).unwrap().curves.len(), report.curves);
        println!(
            "{}: {} curves; trace {:?}; total {:?}",
            path,
            report.curves,
            trace_time,
            start.elapsed()
        );
    }
}

#[test]
#[ignore = "Set RV_IMPORT_INPUTS to a JSON array of local PNG/JPG paths"]
fn user_image_outer_outline_generates_cutter() {
    use rv_cutter_native::{border::Border, cutter, import_into};
    let paths: Vec<String> =
        serde_json::from_str(&std::env::var("RV_IMPORT_INPUTS").expect("input paths")).unwrap();
    assert!(!paths.is_empty());
    for path in paths {
        let start = std::time::Instant::now();
        let imports = prepare_import(std::path::Path::new(&path), 75., 180).unwrap();
        let mut session = Session::default();
        import_into(&mut session, &imports).unwrap();
        let source = session.active_sketch.unwrap();
        let preview =
            cutter::prepare_outer_outline(&session, source, Border::default(), 0.05).unwrap();
        import_into(&mut session, &[preview]).unwrap();
        let outline = session.active_sketch.unwrap();
        println!(
            "{path}: {} original curves -> {} outline curves",
            session.doc.sketch(source).unwrap().curves.len(),
            session.doc.sketch(outline).unwrap().curves.len()
        );
        cutter::create_from_sketch(&mut session, outline, &Default::default()).unwrap();
        let volume: f64 = session
            .model
            .state()
            .bodies
            .iter()
            .map(|b| b.body.volume_at(0.01).unwrap())
            .sum();
        assert!(volume > 0.);
        let bytes = io::write_design_container(&session.doc).unwrap();
        let reopened = Session::new(io::read_design(&bytes).unwrap());
        let restored: f64 = reopened
            .model
            .state()
            .bodies
            .iter()
            .map(|b| b.body.volume_at(0.01).unwrap())
            .sum();
        assert!((volume - restored).abs() < 0.01);
        println!(
            "{path}: cutter saved/reopened, volume {volume} mm3, time {:?}",
            start.elapsed()
        );
    }
}
