#![cfg_attr(target_os = "windows", windows_subsystem = "windows")]
#![forbid(unsafe_code)]
mod appearance;
mod ribbon;
use serde_json::json;
use solidcraft_engine::Session;
use solidcraft_ui_egui::{Services, SolveApp};
use std::sync::mpsc;
struct App {
    cad: SolveApp,
    recipe_pending: Option<mpsc::Receiver<rv_cutter_native::Result<serde_json::Value>>>,
    cutter_tab: bool,
    cutter_sketch: Option<u64>,
    cutter: rv_cutter_native::cutter::CutterSettings,
    border: rv_cutter_native::border::Border,
    border_tolerance: f64,
    auto_size: bool,
    size: f64,
    threshold: u8,
    simplify_px: f64,
    min_area_px: f64,
    pending: Option<
        mpsc::Receiver<rv_cutter_native::Result<(Vec<rv_cutter_native::Import>, Option<f64>)>>,
    >,
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
                match result.and_then(|(imports, size_mm)| {
                    rv_cutter_native::import_into_report(&mut self.cad.session, &imports, size_mm)
                }) {
                    Ok(report) => {
                        if self.cutter_tab {
                            self.cutter_sketch = self.cad.session.active_sketch;
                        }
                        self.cad.ui.tab = "SKETCH".into();
                        self.cad.tool = None;
                        self.cad.dialog = None;
                        focus_sketch(&mut self.cad);
                        let message = report.notice.unwrap_or_else(|| {
                            format!(
                                "Sketch importado: {} curvas editáveis. {}",
                                report.curves,
                                if report.proportional_size {
                                    "Cota proporcional aplicada."
                                } else {
                                    ""
                                }
                            )
                        });
                        self.cad.set_status(message, false);
                    }
                    Err(e) => self.cad.set_status(e, true),
                }
            } else {
                ctx.request_repaint_after(std::time::Duration::from_millis(100));
            }
        }
        let recipe_ready = self
            .recipe_pending
            .as_ref()
            .and_then(|rx| match rx.try_recv() {
                Ok(value) => Some(value),
                Err(mpsc::TryRecvError::Empty) => None,
                Err(mpsc::TryRecvError::Disconnected) => {
                    Some(Err("Falha ao carregar operação.".into()))
                }
            });
        if let Some(result) = recipe_ready {
            self.recipe_pending = None;
            match result
                .and_then(|value| rv_cutter_native::recipe::apply(&mut self.cad.session, &value))
            {
                Ok(()) => {
                    if self.cad.session.active_sketch.is_some() {
                        focus_sketch(&mut self.cad);
                    } else {
                        self.cad.ui.tab = "SOLID".into();
                        self.cad.fit_view();
                    }
                    self.cad.set_status(
                        "Operação aplicada. Edite as expressões em Parâmetros para recalcular.",
                        false,
                    );
                }
                Err(error) => self.cad.set_status(error, true),
            }
        }
        if self.recipe_pending.is_some() {
            ctx.request_repaint_after(std::time::Duration::from_millis(100));
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
                    focus_sketch(&mut self.cad);
                }
            }
            ui.label("Imagem mm");
            ui.add(egui::DragValue::new(&mut self.size).range(1.0..=10000.0));
            ui.label("Limiar");
            ui.add(egui::DragValue::new(&mut self.threshold));
            ui.checkbox(&mut self.auto_size, "Cota automática")
                .on_hover_text("Imagem PNG/JPG: escala o maior lado para Imagem mm e registra relações proporcionais. Edite rv_tamanho em Parâmetros; desative para editar livremente. Limite: 256 curvas.");
            ui.label("Simplificação (px)");
            ui.add(egui::DragValue::new(&mut self.simplify_px).range(0.1..=3.0).speed(0.05));
            ui.label("Ruído (px²)");
            ui.add(egui::DragValue::new(&mut self.min_area_px).range(0.0..=1000.0));
            let import_requested = ui.ctx().data_mut(|d| d.remove_temp::<bool>(egui::Id::new(ribbon::OPEN_IMPORT))).unwrap_or(false);
            if self.pending.is_none() && (ui.add_enabled(self.pending.is_none(), egui::Button::new("Importar contornos"))
                .on_hover_text("PNG/JPG: vetoriza em Rust. SVG: curvas nativas. Projeto RV antigo: somente contornos; suas cotas e operações não são migradas.")
                .clicked() || import_requested)
            {
                let (tx, rx) = mpsc::channel();
                let size = self.size;
                let options = rv_cutter_native::raster::TraceOptions {
                    threshold: self.threshold, simplify_px: self.simplify_px, min_area_px: self.min_area_px,
                };
                let auto_size = self.auto_size;
                let ctx = ui.ctx().clone();
                self.pending = Some(rx);
                std::thread::spawn(move || {
                    let result = match rfd::FileDialog::new()
                        .add_filter("Contornos / projeto RV", &["png", "jpg", "jpeg", "svg", "rvcad", "json"])
                        .pick_file()
                    {
                        Some(path) => {
                            let raster = path.extension().and_then(|e| e.to_str()).is_some_and(|e|
                                ["png", "jpg", "jpeg"].iter().any(|kind| e.eq_ignore_ascii_case(kind)));
                            rv_cutter_native::prepare_import_with_options(&path, size, options)
                                .map(|imports| (imports, if raster && auto_size { Some(size) } else { None }))
                        },
                        None => Err("Importação cancelada.".into()),
                    };
                    let _ = tx.send(result);
                    ctx.request_repaint();
                });
            }
            if ui.button("Parâmetros").clicked() {
                self.cad.start("parameters.change");
            }
            let editing = self.cad.session.active_sketch.is_some();
            if ui.add_enabled(editing, egui::Button::new("Restringir automaticamente")).clicked() {
                let _ = self.cad.run("sketch.auto_constrain", json!({}));
            }
            if ui.add_enabled(editing, egui::Button::new("Concluir com restrições")).clicked() {
                if self.cad.run("sketch.finish_auto_constrain", json!({})).is_ok() {
                    self.cad.ui.tab = "SOLID".into();
                }
            }
            if ui.add_enabled(self.recipe_pending.is_none() && self.pending.is_none(), egui::Button::new("Operação paramétrica RV")).clicked() {
                let (tx, rx) = mpsc::channel();
                self.recipe_pending = Some(rx);
                let ctx = ui.ctx().clone();
                std::thread::spawn(move || {
                    let result = (|| -> rv_cutter_native::Result<serde_json::Value> {
                        let path = rfd::FileDialog::new().add_filter("Operação RV", &["json"]).pick_file().ok_or("Operação cancelada.")?;
                        if std::fs::metadata(&path).map_err(|e|e.to_string())?.len() > 1024*1024 { return Err("Operação excede 1 MB.".into()); }
                        let bytes = std::fs::read(path).map_err(|e|e.to_string())?;
                        serde_json::from_slice(&bytes).map_err(|e|e.to_string())
                    })();
                    let _ = tx.send(result);
                    ctx.request_repaint();
                });
            }
            ui.label("SolidCraft Rust / B-rep");
        });
        ui.separator();
        self.cad.ui(ui);
        if ui
            .ctx()
            .data_mut(|d| d.remove_temp::<bool>(egui::Id::new(ribbon::OPEN_CUTTER)))
            .unwrap_or(false)
        {
            self.cutter_tab = true;
            self.cutter_sketch = self.cad.session.active_sketch;
        }
        if self.cutter_tab {
            let sketches: Vec<_> = self
                .cad
                .session
                .doc
                .features
                .iter()
                .filter(|feature| {
                    !feature.suppressed && self.cad.session.doc.sketch(feature.id).is_ok()
                })
                .map(|feature| (feature.id, feature.name.clone()))
                .collect();
            if !sketches
                .iter()
                .any(|(id, _)| Some(*id) == self.cutter_sketch)
            {
                self.cutter_sketch = sketches.last().map(|(id, _)| *id);
            }
            let mut open = true;
            let mut generated = false;
            egui::Window::new("Gerar cortador paramétrico")
                .default_width(360.0).default_pos(egui::pos2(480.0, 220.0))
                .open(&mut open).show(ui.ctx(), |ui| {
                ui.strong("CORTADORES DE BISCOITO");
                if ui.add_enabled(self.pending.is_none(), egui::Button::new("Importar imagem / contornos")).clicked() {
                    ui.ctx().data_mut(|d| d.insert_temp(egui::Id::new(ribbon::OPEN_IMPORT), true));
                }
                ui.label("Sketch de origem");
                let selected_label = sketches.iter().find(|(id, _)| Some(*id) == self.cutter_sketch)
                    .map(|(id, name)| format!("{name} (#{id})")).unwrap_or_else(|| "Nenhum Sketch disponível".into());
                egui::ComboBox::from_id_salt("rv-cutter-source").selected_text(selected_label).width(320.0).show_ui(ui, |ui| {
                    for (id, name) in &sketches {
                        ui.selectable_value(&mut self.cutter_sketch, Some(*id), format!("{name} (#{id})"));
                    }
                });
                ui.separator();
                ui.collapsing("Contorno externo / personalizar borda (experimental)", |ui| {
                    ui.label("PNG/JPG vetorizado: usa o maior contorno fechado por área.");
                    ui.weak("Partes separadas menores e detalhes internos não entram na lâmina.");
                    egui::ComboBox::from_label("Padrão").selected_text(match self.border.pattern {
                        rv_cutter_native::border::Pattern::Smooth => "Liso",
                        rv_cutter_native::border::Pattern::Wave => "Ondulado",
                        rv_cutter_native::border::Pattern::Saw => "Serrilhado",
                    }).show_ui(ui, |ui| {
                        use rv_cutter_native::border::Pattern;
                        ui.selectable_value(&mut self.border.pattern, Pattern::Smooth, "Liso");
                        ui.selectable_value(&mut self.border.pattern, Pattern::Wave, "Ondulado");
                        ui.selectable_value(&mut self.border.pattern, Pattern::Saw, "Serrilhado");
                    });
                    ui.horizontal(|ui| {
                        ui.label("Repetições");
                        ui.add(egui::DragValue::new(&mut self.border.repeats).range(1..=80));
                        ui.label("Profundidade mm");
                        ui.add(egui::DragValue::new(&mut self.border.depth_mm).range(-20.0..=20.0).speed(0.05));
                    });
                    ui.horizontal(|ui| {
                        ui.label("Tolerância mm");
                        ui.add(egui::DragValue::new(&mut self.border_tolerance).range(0.001..=0.2).speed(0.001));
                    });
                    ui.weak("Positivo: para fora. Negativo: para dentro. Confira a prévia antes de gerar.");
                    ui.weak("Nesta etapa a borda é uma cópia editável, sem atualização automática do original.");
                    if ui.add_enabled(self.cutter_sketch.is_some(), egui::Button::new("PREPARAR BORDA COMO NOVO SKETCH")).clicked() {
                        let result = self.cutter_sketch.ok_or_else(|| "Escolha um Sketch.".to_string())
                            .and_then(|id| rv_cutter_native::cutter::prepare_outer_outline(&self.cad.session,id,self.border,self.border_tolerance))
                            .and_then(|import| rv_cutter_native::import_into(&mut self.cad.session,&[import]));
                        match result {
                            Ok(()) => {
                                self.cutter_sketch=self.cad.session.active_sketch;
                                focus_sketch(&mut self.cad);
                                self.cad.fit_view();
                                self.cad.set_status("Borda preparada e selecionada. Confira o novo Sketch e clique GERAR CORTADOR. Original preservado.",false);
                            }
                            Err(error) => self.cad.set_status(error,true),
                        }
                    }
                });
                egui::Grid::new("rv-cutter-settings").num_columns(2).spacing([16.0, 10.0]).show(ui, |ui| {
                    ui.label("Lâmina (mm)");
                    ui.add(egui::DragValue::new(&mut self.cutter.blade_height_mm).range(4.0..=100.0).speed(0.1));
                    ui.end_row();
                    ui.label("Espessura (mm)");
                    ui.add(egui::DragValue::new(&mut self.cutter.blade_thickness_mm).range(0.3..=5.0).speed(0.05));
                    ui.end_row();
                    ui.label("Base altura (mm)");
                    ui.add(egui::DragValue::new(&mut self.cutter.base_height_mm).range(0.5..=20.0).speed(0.1));
                    ui.end_row();
                    ui.label("Base largura (mm)");
                    ui.add(egui::DragValue::new(&mut self.cutter.base_width_mm).range(0.5..=20.0).speed(0.1));
                    ui.end_row();
                });
                ui.separator();
                    let available = self.cutter_sketch.is_some();
                    if ui.add_enabled(available, egui::Button::new("GERAR CORTADOR"))
                        .on_hover_text("Cria lâmina e reforço paramétricos a partir do Sketch selecionado. Mantém histórico, permite desfazer e editar dimensões.")
                        .clicked()
                    {
                        let result = self.cutter_sketch.ok_or_else(|| "Escolha um Sketch.".to_string())
                            .and_then(|id| rv_cutter_native::cutter::create_from_sketch(&mut self.cad.session, id, &self.cutter));
                        match result {
                            Ok(()) => {
                                self.cad.ui.tab = "SOLID".into();
                                self.cad.fit_view();
                                generated = true;
                                self.cad.set_status("Cortador RV criado com espessura, altura e base paramétricas.", false);
                            }
                            Err(e) => self.cad.set_status(e, true),
                        }
                    }
                    if !available {
                        ui.weak("Crie ou importe um Sketch para aparecer nesta lista.");
                    }
            });
            self.cutter_tab = open && !generated;
        }
    }
    fn save(&mut self, s: &mut dyn eframe::Storage) {
        s.set_string("rv-native-prefs", self.cad.prefs());
    }
    fn on_exit(&mut self) {
        solidcraft_ui_egui::recovery_ui::close(&mut self.cad);
    }
}
/// Apply the sketch orientation before fitting; fit_view cancels camera animation.
fn focus_sketch(cad: &mut SolveApp) {
    cad.ui.tab = "SKETCH".into();
    solidcraft_ui_egui::dialogs::look_at_sketch(cad);
    if let Some(animation) = cad.cam_anim.take() {
        cad.cam = animation.to;
    }
    cad.fit_view();
}
fn services() -> Services {
    Services {
        ribbon_tabs: vec![("CORTADORES", ribbon::draw)],
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
                focus_sketch(&mut cad);
            } else if !demo {
                let _ = cad.run("sketch.create", json!({"plane":"XY","name":"Sketch RV"}));
                focus_sketch(&mut cad);
            }
            cad.fit_view();
            if args.iter().any(|s| s == "--cortadores") {
                cad.ui.tab = "CORTADORES".into();
            }
            Ok(Box::new(App {
                cad,
                size: 75.0,
                threshold: 180,
                simplify_px: 1.0,
                min_area_px: 0.0,
                pending: None,
                recipe_pending: None,
                cutter_tab: false,
                cutter_sketch: None,
                cutter: rv_cutter_native::cutter::CutterSettings::default(),
                border: rv_cutter_native::border::Border::default(),
                border_tolerance: 0.05,
                auto_size: true,
            }))
        }),
    )
}
