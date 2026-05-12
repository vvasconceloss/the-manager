use crate::db::connection::open;
use crate::db::migrations::run;
use crate::errors::AppError;
use crate::state::AppState;
use chrono::{DateTime, Utc};
use dirs::document_dir;
use serde::{Deserialize, Serialize};
use std::fs::{self, metadata};
use std::path::PathBuf;
use tauri::State;

const SAVE_EXTENSION: &str = "tm";
const SAVE_DIR_NAME: &str = "TheManager/saves";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SaveInfo {
    pub name: String,
    pub path: String,
    pub modified_at: DateTime<Utc>,
}

fn get_saves_dir() -> Result<PathBuf, AppError> {
    let documents = document_dir()
        .ok_or_else(|| AppError::Io("Could not find documents directory".to_string()))?;
    Ok(documents.join(SAVE_DIR_NAME))
}

fn normalize_save_name(name: &str) -> String {
    name.to_lowercase()
        .chars()
        .map(|c| if c.is_alphanumeric() { c } else { '-' })
        .collect::<String>()
        .split('-')
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>()
        .join("-")
}

#[tauri::command]
pub fn new_game(name: String, state: State<AppState>) -> Result<SaveInfo, AppError> {
    if name.trim().is_empty() {
        return Err(AppError::Domain("Save name cannot be empty".to_string()));
    }

    let save_dir = get_saves_dir()?;
    if !save_dir.exists() {
        fs::create_dir_all(&save_dir).map_err(|e| AppError::Io(e.to_string()))?;
    }

    let normalized = normalize_save_name(&name);
    let save_path = save_dir.join(format!("{}.tm", normalized));

    if save_path.exists() {
        return Err(AppError::Domain(format!(
            "Save '{}' already exists",
            normalized
        )));
    }

    let mut conn = open(save_path.to_string_lossy().as_ref())?;
    run(&mut conn)?;

    let mut db_guard = state.db.lock().map_err(|_| AppError::LockPoisoned)?;
    *db_guard = Some(conn);

    let metadata = metadata(&save_path).map_err(|e| AppError::Io(e.to_string()))?;
    let modified: DateTime<Utc> = metadata
        .modified()
        .map_err(|e| AppError::Io(e.to_string()))?
        .into();

    Ok(SaveInfo {
        name: normalized,
        path: save_path.to_string_lossy().to_string(),
        modified_at: modified,
    })
}

pub fn list_saves_in_dir(dir: &PathBuf) -> Result<Vec<SaveInfo>, AppError> {
    if !dir.exists() {
        return Ok(Vec::new());
    }

    let mut saves = Vec::new();

    for entry in fs::read_dir(dir).map_err(|e| AppError::Io(e.to_string()))? {
        let entry = entry.map_err(|e| AppError::Io(e.to_string()))?;
        let path = entry.path();

        if !path.is_file() {
            continue;
        }

        let extension = path
            .extension()
            .and_then(|e| e.to_str())
            .map(|e| e.to_lowercase());

        if extension.as_deref() != Some(SAVE_EXTENSION) {
            continue;
        }

        let name = path
            .file_stem()
            .and_then(|n| n.to_str())
            .map(|n| n.to_string())
            .ok_or_else(|| AppError::Io("Invalid save file name".to_string()))?;

        let metadata = metadata(&path).map_err(|e| AppError::Io(e.to_string()))?;
        let modified: DateTime<Utc> = metadata
            .modified()
            .map_err(|e| AppError::Io(e.to_string()))?
            .into();

        let path_str = path.to_string_lossy().to_string();

        saves.push(SaveInfo {
            name,
            path: path_str,
            modified_at: modified,
        });
    }

    saves.sort_by(|a, b| b.modified_at.cmp(&a.modified_at));

    Ok(saves)
}

#[tauri::command]
pub fn list_saves() -> Result<Vec<SaveInfo>, AppError> {
    let dir = get_saves_dir()?;
    list_saves_in_dir(&dir)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::TempDir;

    #[test]
    fn test_normalize_save_name_simple() {
        assert_eq!(normalize_save_name("My Save"), "my-save");
    }

    #[test]
    fn test_normalize_save_name_with_spaces() {
        assert_eq!(normalize_save_name("  Test Game  "), "test-game");
    }

    #[test]
    fn test_normalize_save_name_with_special_chars() {
        assert_eq!(normalize_save_name("Game#1!"), "game-1");
    }

    #[test]
    fn test_normalize_save_name_already_normalized() {
        assert_eq!(
            normalize_save_name("already-normalized"),
            "already-normalized"
        );
    }

    #[test]
    fn test_list_saves_empty_dir() {
        let temp_dir = TempDir::new().unwrap();
        let saves = list_saves_in_dir(&temp_dir.path().to_path_buf()).unwrap();
        assert!(saves.is_empty());
    }

    #[test]
    fn test_list_saves_filters_non_tm_files() {
        let temp_dir = TempDir::new().unwrap();
        fs::write(temp_dir.path().join("readme.txt"), "test").unwrap();
        fs::write(temp_dir.path().join("data.db"), "test").unwrap();

        let saves = list_saves_in_dir(&temp_dir.path().to_path_buf()).unwrap();
        assert!(saves.is_empty());
    }

    #[test]
    fn test_list_saves_returns_tm_files() {
        let temp_dir = TempDir::new().unwrap();
        fs::write(temp_dir.path().join("save1.tm"), "test").unwrap();
        fs::write(temp_dir.path().join("save2.tm"), "test").unwrap();
        fs::write(temp_dir.path().join("save3.tm"), "test").unwrap();

        let saves = list_saves_in_dir(&temp_dir.path().to_path_buf()).unwrap();
        assert_eq!(saves.len(), 3);
    }

    #[test]
    fn test_list_saves_ignores_uppercase_extension() {
        let temp_dir = TempDir::new().unwrap();
        fs::write(temp_dir.path().join("save1.TM"), "test").unwrap();
        fs::write(temp_dir.path().join("save2.Tm"), "test").unwrap();

        let saves = list_saves_in_dir(&temp_dir.path().to_path_buf()).unwrap();
        assert_eq!(saves.len(), 2);
    }
}
