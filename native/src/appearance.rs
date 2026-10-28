//! RV controls inherit the SolidCraft theme; layout metrics live here.
use solidcraft_ui_egui::theme::Tokens;
pub const BUTTON_SIZE: egui::Vec2 = egui::vec2(128.0, 34.0);
pub fn action(ui: &mut egui::Ui, label: &str, help: &str) -> bool {
    let t = Tokens::get();
    ui.add_sized(
        BUTTON_SIZE,
        egui::Button::new(egui::RichText::new(label).color(t.text)).fill(t.field),
    )
    .on_hover_text(help)
    .clicked()
}
