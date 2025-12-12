use crate::{
    club::value_objects::player::{
        attributes::PlayerAttributes, position::positions::PlayerPositions,
    },
    shared::value_objects::{birth_date::BirthDate, person_name::PersonName},
};

#[derive(Debug, Clone)]
pub struct Player {
    pub id: u64,
    pub nation_id: u64,
    pub name: PersonName,
    pub birth_date: BirthDate,
    pub positions: PlayerPositions,
    pub attributes: PlayerAttributes,
}

impl Player {
    pub fn new(
        id: u64,
        nation_id: u64,
        name: PersonName,
        birth_date: BirthDate,
        positions: PlayerPositions,
        attributes: PlayerAttributes,
    ) -> Self {
        Player {
            id,
            nation_id,
            name,
            birth_date,
            positions,
            attributes,
        }
    }
}
