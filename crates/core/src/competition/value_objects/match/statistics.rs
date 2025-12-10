use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MatchStatistics {
    pub home_score: u8,
    pub away_score: u8,
}

impl MatchStatistics {
    pub fn new() -> Self {
        MatchStatistics {
            home_score: 0,
            away_score: 0,
        }
    }
}
