use crate::club::entities::player::Player;

#[derive(Debug, Clone)]
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

    pub fn add_player(&mut self, player: Player) {
        self.players.push(player);
    }

    pub fn remove_player(&mut self, player_id: u64) {
        self.players.retain(|player| player.id != player_id);
    }
}
