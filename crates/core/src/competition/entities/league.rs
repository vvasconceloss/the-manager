use crate::competition::value_objects::league::row::LeagueTableRow;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct League {
    pub id: u64,
    pub competition_id: u64,
    pub table: Vec<LeagueTableRow>,
}

impl League {
    pub fn new(id: u64, competition_id: u64, teams: &[u64]) -> Self {
        Self {
            id,
            competition_id,
            table: Self::generate_rows(teams),
        }
    }

    pub fn generate_rows(teams: &[u64]) -> Vec<LeagueTableRow> {
        let mut rows = Vec::with_capacity(teams.len());

        for id in teams {
            let row = LeagueTableRow {
                team_id: *id,
                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goals_scored: 0,
                goals_conceded: 0,
                points: 0,
            };

            rows.push(row);
        }

        rows
    }
}
