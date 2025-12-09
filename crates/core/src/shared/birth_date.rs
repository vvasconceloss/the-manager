use crate::errors::CoreError;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BirthDate(pub String);

impl BirthDate {
    pub fn new(birth_date_str: &str) -> Result<Self, CoreError> {
        let birth_date = birth_date_str.trim().to_string();

        if birth_date.is_empty() {
            return Err(CoreError::ValidationFailed(
                "Birth date cannot be empty".to_string(),
            ));
        }

        Ok(BirthDate(birth_date))
    }
}
