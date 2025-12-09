use crate::errors::CoreError;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Attribute(pub u8);

impl Default for Attribute {
    fn default() -> Self {
        Attribute(10)
    }
}

impl Attribute {
    const MIN_ATTRIBUTE: u8 = 1;
    const MAX_ATTRIBUTE: u8 = 20;

    pub fn new(value: u8) -> Result<Self, CoreError> {
        if !(Self::MIN_ATTRIBUTE..=Self::MAX_ATTRIBUTE).contains(&value) {
            return Err(CoreError::ValidationFailed(format!(
                "Attribute needs a value between {0} and {1}",
                Self::MIN_ATTRIBUTE,
                Self::MAX_ATTRIBUTE
            )));
        }

        Ok(Attribute(value))
    }
}
