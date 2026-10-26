//! Declarative native operations: parameters and ordered CAD commands, one undo transaction.
use crate::Result;
use serde_json::Value;
use solidcraft_engine::{Session, Snapshot};

pub fn apply(session: &mut Session, recipe: &Value) -> Result<()> {
    if recipe["format"] != "rv-parametric-recipe-1" {
        return Err("Formato de operação paramétrica inválido.".into());
    }
    let commands = recipe["commands"].as_array().ok_or("Comandos ausentes.")?;
    if commands.is_empty() || commands.len() > 200 {
        return Err("A operação precisa ter entre 1 e 200 comandos.".into());
    }
    // Recipes operate on CAD geometry only, never on external files or system services.
    for command in commands {
        let id = command["command"]
            .as_str()
            .ok_or("Nome de comando ausente.")?;
        if !["sketch.", "solid.", "parameters."]
            .iter()
            .any(|prefix| id.starts_with(prefix))
            || id.contains("insert")
            || id.contains("import")
            || id.contains("export")
            || id.contains("picture")
            || id.contains("image")
            || solidcraft_engine::cmd::find_command(id).is_none()
        {
            return Err(format!("Comando não permitido nesta operação: {id}"));
        }
        if !command["params"].is_object() {
            return Err(format!("Parâmetros inválidos: {id}"));
        }
    }
    let checkpoint = session.checkpoint();
    let before = Snapshot {
        label: recipe["name"].as_str().unwrap_or("Operação RV").to_owned(),
        doc: session.doc.clone(),
        active_sketch: session.active_sketch,
        pending_moves: session.pending_moves.clone(),
    };
    let undo_len = session.undo.len();
    let outcome = (|| -> Result<()> {
        if session.active_sketch.is_some() {
            session
                .execute("sketch.finish", &serde_json::json!({}))
                .map_err(|e| e.to_string())?;
        }
        commands.iter().try_for_each(|command| {
            session
                .execute(
                    command["command"].as_str().unwrap_or_default(),
                    &command["params"],
                )
                .map(|_| ())
                .map_err(|error| error.to_string())
        })
    })();
    if let Err(error) = outcome {
        let restored = session.restore_checkpoint(checkpoint);
        session.drop_checkpoint(checkpoint);
        restored.map_err(|restore| format!("{error}; restauração: {restore}"))?;
        return Err(error);
    }
    session.drop_checkpoint(checkpoint);
    session.undo.truncate(undo_len);
    session.undo.push(before);
    session.redo.clear();
    Ok(())
}
