use crate::errors::CoreError;

#[derive(Debug, Clone)]
pub struct FederationName(pub String);

impl FederationName {
    pub fn new(name_str: &str) -> Result<Self, CoreError> {
        let name = name_str.trim().to_string();

        if name.is_empty() {
            return Err(CoreError::ValidationFailed(
                "Federation name cannot be empty".to_string(),
            ));
        }

        Ok(FederationName(name))
    }
}
