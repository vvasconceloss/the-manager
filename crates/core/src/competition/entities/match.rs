use crate::competition::value_objects::r#match::{
    statistics::MatchStatistics, status::MatchStatus,
};
use chrono::NaiveDate;

#[derive(Debug, Clone)]
pub struct Match {
    pub id: u64,
    pub home_id: u64,
    pub away_id: u64,
    pub competition_id: u64,
    pub date: NaiveDate,
    pub status: MatchStatus,
    pub statistics: MatchStatistics,
}

impl Match {
    pub fn new(
        id: u64,
        home_id: u64,
        away_id: u64,
        competition_id: u64,
        date: NaiveDate,
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

    pub fn date_as_string(&self) -> String {
        self.date.format("%Y-%m-%d").to_string()
    }
}
