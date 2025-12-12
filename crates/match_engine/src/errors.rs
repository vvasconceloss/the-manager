use core_lib::errors::CoreError;

#[derive(Debug, thiserror::Error)]
pub enum MatchError {
    #[error("A core error has occurred: {0}")]
    CoreError(String),
    #[error("The resource was not found: {0}")]
    ResourceNotFound(String),
    #[error("An unknown error occurred: {0}")]
    UnknownError(String),
}

impl From<CoreError> for MatchError {
    fn from(error: CoreError) -> Self {
        MatchError::CoreError(error.to_string())
    }
}
