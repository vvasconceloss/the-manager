use crate::errors::CoreError;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CompetitionName {
    pub name: String,
    pub acronym: String,
}

impl CompetitionName {
    const MAX_ACRONYM_LENGTH: usize = 3;

    pub fn new(name_str: &str, acronym_str: &str) -> Result<Self, CoreError> {
        let name = name_str.trim().to_string();
        let acronym = acronym_str.trim().to_string();

        if name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "The competition's name cannot be empty.".to_string(),
            ));
        }

        if acronym.is_empty() {
            return Err(CoreError::ValidationFailed(
                "The competition's acronym cannot be empty.".to_string(),
            ));
        }

        if acronym.len() != Self::MAX_ACRONYM_LENGTH {
            return Err(CoreError::ValidationFailed(format!(
                "The competition's acronym must be exactly {0} characters long.",
                Self::MAX_ACRONYM_LENGTH
            )));
        }

        Ok(CompetitionName { name, acronym })
    }
}
