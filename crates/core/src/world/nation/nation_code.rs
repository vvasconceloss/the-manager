use crate::errors::CoreError;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NationCode(pub String);

impl NationCode {
    pub fn new(code_str: &str) -> Result<Self, CoreError> {
        let code = code_str.trim().to_string();

        if code.is_empty() {
            return Err(CoreError::ValidationFailed(
                "The nation's code cannot be empty.".to_string(),
            ));
        }

        if code.len() != 3 {
            return Err(CoreError::ValidationFailed(
                "The nation's code must be exactly three characters long.".to_string(),
            ));
        }

        Ok(NationCode(code))
    }
}
