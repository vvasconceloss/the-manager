#[derive(Debug, thiserror::Error)]
pub enum CoreError {
    #[error("The reputation value is invalid: {0}")]
    InvalidReputation(u8),
    #[error("The value ({0}) is outside the permitted limits")]
    OutOfRange(String),
    #[error("A validation error occurred: {0}")]
    ValidationFailed(String),
    #[error("The resource was not found: {0}")]
    ResourceNotFound(String),
    #[error("An unknown error occurred: {0}")]
    UnknownError(String),
}
