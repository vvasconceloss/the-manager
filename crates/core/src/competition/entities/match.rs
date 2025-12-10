use crate::competition::value_objects::r#match::status::MatchStatus;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Match {
    pub id: u64,
    pub home_id: u64,
    pub away_id: u64,
    pub home_score: u8,
    pub away_score: u8,
    pub date: String,
    pub status: MatchStatus,
}

impl Match {
    pub fn new(
        id: u64,
        home_id: u64,
        away_id: u64,
        home_score: u8,
        away_score: u8,
        date: String,
        status: MatchStatus,
    ) -> Self {
        Match {
            id,
            home_id,
            away_id,
            home_score,
            away_score,
            date,
            status,
        }
    }
}
