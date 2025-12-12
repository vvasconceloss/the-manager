use crate::competition::entities::r#match::Match;

#[derive(Debug, Clone)]
pub struct ScheduleRound {
    pub round_number: u8,
    pub matches: Vec<Match>,
}

#[derive(Debug, Clone)]
pub struct LeagueSchedule {
    pub rounds: Vec<ScheduleRound>,
}

impl Default for LeagueSchedule {
    fn default() -> Self {
        Self::new()
    }
}

impl LeagueSchedule {
    pub fn new() -> Self {
        LeagueSchedule { rounds: Vec::new() }
    }
}
