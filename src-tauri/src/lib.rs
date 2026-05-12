use crate::state::AppState;

pub mod commands;
pub mod db;
pub mod domain;
pub mod engine;
pub mod errors;
pub mod state;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState::default())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::save::list_saves,
            commands::save::new_game,
            commands::save::get_game_state,
            commands::save::load_game
        ])
        .run(tauri::generate_context!())
        .expect("failed to start the application");
}
