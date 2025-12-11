use crate::competition::entities::r#match::Match;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScheduleRound {
    pub round_number: u8,
    pub matches: Vec<Match>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LeagueSchedule {
    pub rounds: Vec<ScheduleRound>,
}

impl LeagueSchedule {
    pub fn new() -> Self {
        LeagueSchedule { rounds: Vec::new() }
    }
}
