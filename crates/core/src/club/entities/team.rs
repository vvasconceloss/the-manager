use crate::club::entities::player::Player;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Team {
    pub id: u64,
    pub club_id: u64,
    pub league_id: u64,
    pub players: Vec<Player>,
}

impl Team {
    pub fn new(id: u64, club_id: u64, league_id: u64, players: Vec<Player>) -> Self {
        Self {
            id,
            club_id,
            league_id,
            players,
        }
    }
}
