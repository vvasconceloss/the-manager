use crate::{
    club::value_objects::club::name::ClubName, shared::value_objects::reputation::Reputation,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Club {
    pub id: u64,
    pub nation_id: u64,
    pub stadium_id: u64,
    pub name: ClubName,
    pub foundation_year: u64,
    pub reputation: Reputation,
}

impl Club {
    pub fn new(
        id: u64,
        nation_id: u64,
        stadium_id: u64,
        name: ClubName,
        foundation_year: u64,
        reputation: Reputation,
    ) -> Self {
        Club {
            id,
            nation_id,
            stadium_id,
            name,
            foundation_year,
            reputation,
        }
    }
}
