use crate::errors::CoreError;

#[derive(Debug, Clone)]
pub struct StadiumName(pub String);

impl StadiumName {
    pub fn new(name_str: &str) -> Result<Self, CoreError> {
        let name = name_str.trim().to_string();

        if name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "Stadium name cannot be empty".to_string(),
            ));
        }

        Ok(StadiumName(name))
    }
}
