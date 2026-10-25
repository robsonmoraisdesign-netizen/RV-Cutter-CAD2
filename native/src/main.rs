#![cfg_attr(target_os = "windows", windows_subsystem = "windows")]
#![forbid(unsafe_code)]
use serde_json::json;
use solidcraft_engine::Session;
use solidcraft_ui_egui::{Services, SolveApp};
use std::sync::mpsc;
struct App {
    cad: SolveApp,
    size: f64,
    threshold: u8,
    pending: Option<mpsc::Receiver<rv_cutter_native::Result<Vec<rv_cutter_native::Import>>>>,
}
impl eframe::App for App {
    fn logic(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        if ctx.input(|i| i.viewport().close_requested()) && !self.cad.quit_requested {
            ctx.send_viewport_cmd(egui::ViewportCommand::CancelClose);
            solidcraft_ui_egui::documents::request_quit(&mut self.cad);
        }
        let ready = self.pending.as_ref().and_then(|rx| match rx.try_recv() {
            Ok(r) => Some(r),
            Err(mpsc::TryRecvError::Empty) => None,
            Err(mpsc::TryRecvError::Disconnected) => {
                Some(Err("Falha no processo de importação.".into()))
            }
        });
        if self.pending.is_some() {
            if let Some(result) = ready {
                self.pending = None;
                match result.and_then(|imports| {
                    rv_cutter_native::import_into(&mut self.cad.session, &imports)
                }) {
                    Ok(()) => {
                        self.cad.ui.tab = "SKETCH".into();
                        self.cad.tool = None;
                        self.cad.dialog = None;
                        solidcraft_ui_egui::dialogs::look_at_sketch(&mut self.cad);
                        self.cad.fit_view();
                        self.cad
                            .set_status("Contornos importados como Sketch nativo editável.", false);
                    }
                    Err(e) => self.cad.set_status(e, true),
                }
            } else {
                ctx.request_repaint_after(std::time::Duration::from_millis(100));
            }
        }
        self.cad.logic(ctx);
        if self.cad.quit_requested {
            ctx.send_viewport_cmd(egui::ViewportCommand::Close);
        }
    }
    fn raw_input_hook(&mut self, _ctx: &egui::Context, raw: &mut egui::RawInput) {
        self.cad.raw_input_hook(raw);
    }
    fn ui(&mut self, ui: &mut egui::Ui, _frame: &mut eframe::Frame) {
        ui.horizontal_wrapped(|ui| {
            ui.strong("RV CUTTER · NATIVO");
            ui.label("Sketch / Parâmetros / Sólido");
            if ui.button("Novo Sketch XY").clicked() {
                let finished = self.cad.session.active_sketch.is_none()
                    || self.cad.run("sketch.finish", json!({})).is_ok();
                if finished {
                    let _ = self.cad.run("sketch.create", json!({"plane":"XY"}));
                    solidcraft_ui_egui::dialogs::look_at_sketch(&mut self.cad);
                    self.cad.fit_view();
                }
            }
            ui.label("Imagem mm");
            ui.add(egui::DragValue::new(&mut self.size).range(1.0..=10000.0));
            ui.label("Limiar");
            ui.add(egui::DragValue::new(&mut self.threshold));
            if ui.add_enabled(self.pending.is_none(), egui::Button::new("Importar contornos"))
                .on_hover_text("PNG/JPG: vetoriza em Rust. SVG: curvas nativas. Projeto RV antigo: somente contornos; suas cotas e operações não são migradas.")
                .clicked()
            {
                let (tx, rx) = mpsc::channel();
                let size = self.size;
                let threshold = self.threshold;
                let ctx = ui.ctx().clone();
                self.pending = Some(rx);
                std::thread::spawn(move || {
                    let result = match rfd::FileDialog::new()
                        .add_filter("Contornos / projeto RV", &["png", "jpg", "jpeg", "svg", "rvcad", "json"])
                        .pick_file()
                    {
                        Some(path) => rv_cutter_native::prepare_import(&path, size, threshold),
                        None => Err("Importação cancelada.".into()),
                    };
                    let _ = tx.send(result);
                    ctx.request_repaint();
                });
            }
            if ui.button("Parâmetros").clicked() {
                self.cad.start("parameters.change");
            }
            ui.label("SolidCraft Rust / B-rep");
        });
        ui.separator();
        self.cad.ui(ui);
    }
    fn save(&mut self, s: &mut dyn eframe::Storage) {
        s.set_string("rv-native-prefs", self.cad.prefs());
    }
    fn on_exit(&mut self) {
        solidcraft_ui_egui::recovery_ui::close(&mut self.cad);
    }
}
fn services() -> Services {
    Services {
        pick_open: Some(Box::new(|exts| {
            let dialog = rfd::AsyncFileDialog::new().add_filter(
                "CAD",
                if exts.is_empty() {
                    &["solidcraft", "step", "stl", "svg"]
                } else {
                    exts
                },
            );
            Box::pin(async move {
                dialog
                    .pick_file()
                    .await
                    .map(|p| p.path().to_string_lossy().into_owned())
            })
        })),
        pick_save: Some(Box::new(|name, exts| {
            let dialog = rfd::AsyncFileDialog::new()
                .set_file_name(name)
                .add_filter("CAD", exts);
            Box::pin(async move {
                dialog
                    .save_file()
                    .await
                    .map(|p| p.path().to_string_lossy().into_owned())
            })
        })),
        ..Services::default()
    }
}
fn main() -> eframe::Result {
    let args: Vec<String> = std::env::args().collect();
    let demo = args.iter().any(|s| s == "--demo");
    let import_path = args
        .windows(2)
        .find(|p| p[0] == "--import")
        .map(|p| p[1].clone());
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_inner_size([1440.0, 900.0])
            .with_min_inner_size([1050.0, 650.0]),
        depth_buffer: 24,
        stencil_buffer: 8,
        multisampling: 1,
        ..Default::default()
    };
    eframe::run_native(
        "RV Cutter Native — Sketch Alpha",
        options,
        Box::new(move |cc| {
            solidcraft_ui_egui::fonts::setup_fonts(&cc.egui_ctx);
            let mut session = Session::default();
            session.doc_mut().name = "Projeto RV".into();
            if demo {
                rv_cutter_native::demo(&mut session).map_err(std::io::Error::other)?;
            }
            let mut cad = SolveApp::new(session, services());
            if let Some(p) = cc.storage.and_then(|s| s.get_string("rv-native-prefs")) {
                cad.load_prefs(&p);
            }
            cad.custom_titlebar = false;
            if let Some(rs) = &cc.wgpu_render_state {
                cad.set_wgpu(rs, 24, 8, rs.msaa_samples);
                solidcraft_ui_egui::gpu::install_picture_renderer(rs);
            }
            if let Some(path) = &import_path {
                let imports =
                    rv_cutter_native::prepare_import(std::path::Path::new(path), 75.0, 180)
                        .map_err(std::io::Error::other)?;
                rv_cutter_native::import_into(&mut cad.session, &imports)
                    .map_err(std::io::Error::other)?;
                solidcraft_ui_egui::dialogs::look_at_sketch(&mut cad);
            } else if !demo {
                let _ = cad.run("sketch.create", json!({"plane":"XY","name":"Sketch RV"}));
                solidcraft_ui_egui::dialogs::look_at_sketch(&mut cad);
            }
            cad.fit_view();
            Ok(Box::new(App {
                cad,
                size: 75.0,
                threshold: 180,
                pending: None,
            }))
        }),
    )
}
