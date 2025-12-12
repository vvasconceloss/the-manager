use crate::errors::CoreError;

#[derive(Debug, Clone)]
pub struct Reputation(pub u8);

impl Reputation {
    const MIN_REPUTATION: u8 = 1;
    const MAX_REPUTATION: u8 = 100;

    pub fn new(value: u8) -> Result<Self, CoreError> {
        if !(Self::MIN_REPUTATION..=Self::MAX_REPUTATION).contains(&value) {
            return Err(CoreError::ValidationFailed(format!(
                "Reputation needs a value between {0} and {1}",
                Self::MIN_REPUTATION,
                Self::MAX_REPUTATION
            )));
        }

        Ok(Reputation(value))
    }
}
