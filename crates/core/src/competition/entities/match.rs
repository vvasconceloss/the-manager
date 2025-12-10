use crate::competition::value_objects::r#match::{
    statistics::MatchStatistics, status::MatchStatus,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Match {
    pub id: u64,
    pub home_id: u64,
    pub away_id: u64,
    pub competition_id: u64,
    pub date: String,
    pub status: MatchStatus,
    pub statistics: MatchStatistics,
}

impl Match {
    pub fn new(
        id: u64,
        home_id: u64,
        away_id: u64,
        competition_id: u64,
        date: String,
        status: MatchStatus,
    ) -> Self {
        Match {
            id,
            home_id,
            away_id,
            competition_id,
            date,
            status,
            statistics: MatchStatistics::default(),
        }
    }
}
