//! Native Design ribbon extension. All geometry is handled by the engine.
use crate::appearance::action;
use solidcraft_ui_egui::SolveApp;
pub const OPEN_CUTTER: &str = "rv-open-cutter";
pub const OPEN_IMPORT: &str = "rv-open-import";
pub fn draw(app: &mut SolveApp, ui: &mut egui::Ui) {
    egui::ScrollArea::horizontal().show(ui, |ui| {
        ui.horizontal(|ui| {
            ui.vertical(|ui| {
                ui.horizontal(|ui| {
                    if action(
                        ui,
                        "Importar contornos",
                        "Vetorizar PNG/JPG ou importar SVG como Sketch editável",
                    ) {
                        ui.ctx()
                            .data_mut(|d| d.insert_temp(egui::Id::new(OPEN_IMPORT), true));
                    }
                    if action(ui, "Novo Sketch", "Criar Sketch no motor nativo") {
                        app.start("sketch.create");
                    }
                });
                ui.small("ENTRADA");
            });
            ui.separator();
            ui.vertical(|ui| {
                ui.horizontal(|ui| {
                    if action(
                        ui,
                        "Gerar cortador",
                        "Configurar lâmina e reforço do Sketch ativo",
                    ) {
                        ui.ctx()
                            .data_mut(|d| d.insert_temp(egui::Id::new(OPEN_CUTTER), true));
                    }
                    if action(ui, "Parâmetros", "Alterar medidas e recalcular o modelo") {
                        app.start("parameters.change");
                    }
                });
                ui.small("FABRICAÇÃO");
            });
            ui.separator();
            ui.vertical(|ui| {
                ui.horizontal(|ui| {
                    if action(
                        ui,
                        "Exportar malha",
                        "Exportar o sólido pelo comando nativo",
                    ) {
                        app.start("file.save_mesh");
                    }
                    if action(ui, "Enquadrar", "Ajustar a câmera ao modelo") {
                        app.fit_view();
                    }
                });
                ui.small("SAÍDA");
            });
        });
    });
}
