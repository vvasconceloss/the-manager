use crate::{
    competition::value_objects::competition::{comp_type::CompetitionType, name::CompetitionName},
    shared::value_objects::reputation::Reputation,
};

#[derive(Debug, Clone)]
pub struct Competition {
    pub id: u64,
    pub nation_id: u64,
    pub name: CompetitionName,
    pub reputation: Reputation,
    pub competition_type: CompetitionType,
}

impl Competition {
    pub fn new(
        id: u64,
        nation_id: u64,
        name: CompetitionName,
        reputation: Reputation,
        competition_type: CompetitionType,
    ) -> Self {
        Competition {
            id,
            nation_id,
            name,
            reputation,
            competition_type,
        }
    }
}
