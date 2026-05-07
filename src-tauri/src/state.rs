use crate::errors::AppError;
use rusqlite::Connection;
use std::sync::Mutex;

pub struct AppState {
    pub db: Mutex<Option<Connection>>,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            db: Mutex::new(None),
        }
    }
}

impl AppState {
    pub fn with_conn<F, R>(&self, f: F) -> Result<R, AppError>
    where
        F: FnOnce(&Connection) -> Result<R, AppError>,
    {
        let guard = self.db.lock().map_err(|_| AppError::LockPoisoned)?;
        let conn = guard.as_ref().ok_or(AppError::NoSaveLoaded)?;

        f(conn)
    }

    pub fn with_conn_mut<F, R>(&self, f: F) -> Result<R, AppError>
    where
        F: FnOnce(&mut Connection) -> Result<R, AppError>,
    {
        let mut guard = self.db.lock().map_err(|_| AppError::LockPoisoned)?;
        let conn = guard.as_mut().ok_or(AppError::NoSaveLoaded)?;
        f(conn)
    }
}
