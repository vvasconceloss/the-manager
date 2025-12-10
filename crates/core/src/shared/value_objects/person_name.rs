use crate::errors::CoreError;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PersonName {
    pub last_name: String,
    pub first_name: String,
    pub nickname: Option<String>,
}

impl PersonName {
    pub fn new(
        last_name_str: &str,
        first_name_str: &str,
        nickname_str: Option<&str>,
    ) -> Result<Self, CoreError> {
        let last_name = last_name_str.trim().to_string();
        let first_name = first_name_str.trim().to_string();
        let nickname = nickname_str.map(|name| name.trim().to_string());

        if last_name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "A person's last name cannot be empty.".to_string(),
            ));
        }

        if first_name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "A person's first name cannot be empty.".to_string(),
            ));
        }

        Ok(PersonName {
            last_name,
            first_name,
            nickname,
        })
    }
}
