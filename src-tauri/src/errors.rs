use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "message")]
pub enum AppError {
    NoSaveLoaded,
    LockPoisoned,
    SaveNotFound(String),
    Domain(String),
    Database(String),
    Io(String),
    Migration(String),
}

impl From<rusqlite::Error> for AppError {
    fn from(e: rusqlite::Error) -> Self {
        Self::Database(e.to_string())
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        Self::Io(e.to_string())
    }
}
