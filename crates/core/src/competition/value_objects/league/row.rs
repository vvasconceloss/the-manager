use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LeagueTableRow {
    pub team_id: u64,
    pub played: u32,
    pub wins: u32,
    pub draws: u32,
    pub losses: u32,
    pub goals_scored: u32,
    pub goals_conceded: u32,
    pub points: u32,
}
