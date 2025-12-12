use crate::errors::CoreError;
use chrono::NaiveDate;

#[derive(Debug, Clone)]
pub struct BirthDate(pub NaiveDate);

impl BirthDate {
    pub fn new(birth_date_str: &str) -> Result<Self, CoreError> {
        let birth_date = NaiveDate::parse_from_str(birth_date_str, "%d%-%m-%Y")
            .map_err(|_e| CoreError::ValidationFailed("Birth date is invalid".to_string()))?;

        Ok(BirthDate(birth_date))
    }
}
