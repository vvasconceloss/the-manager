use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LeagueTableRow {
    pub team_id: u64,
    pub played: u8,
    pub wins: u8,
    pub draws: u8,
    pub losses: u8,
    pub goals_scored: u8,
    pub goals_conceded: u8,
    pub points: u8,
}
