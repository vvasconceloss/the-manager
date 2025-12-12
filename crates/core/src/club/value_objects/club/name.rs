use crate::errors::CoreError;

#[derive(Debug, Clone)]
pub struct ClubName {
    pub name: String,
    pub acronym: String,
}

impl ClubName {
    const MAX_ACRONYM_LENGTH: usize = 3;

    pub fn new(name_str: &str, acronym_str: &str) -> Result<Self, CoreError> {
        let name = name_str.trim().to_string();
        let acronym = acronym_str.trim().to_string();

        if name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "The club's name cannot be empty.".to_string(),
            ));
        }

        if acronym.is_empty() {
            return Err(CoreError::ValidationFailed(
                "The club's acronym cannot be empty.".to_string(),
            ));
        }

        if acronym.len() != Self::MAX_ACRONYM_LENGTH {
            return Err(CoreError::ValidationFailed(format!(
                "The club's acronym must be exactly {0} characters long.",
                Self::MAX_ACRONYM_LENGTH
            )));
        }

        Ok(ClubName { name, acronym })
    }
}
