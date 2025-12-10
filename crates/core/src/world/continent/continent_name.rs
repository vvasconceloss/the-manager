use crate::errors::CoreError;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContinentName(pub String);

impl ContinentName {
    pub fn new(name_str: &str) -> Result<Self, CoreError> {
        let name = name_str.trim().to_string();

        if name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "Continent name cannot be empty".to_string(),
            ));
        }

        Ok(ContinentName(name))
    }
}
