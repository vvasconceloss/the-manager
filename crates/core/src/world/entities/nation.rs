use crate::{
    shared::value_objects::reputation::Reputation,
    world::value_objects::nation::{
        code::NationCode, confederation::Confederation, name::NationName,
    },
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Nation {
    pub id: u64,
    pub continent_id: u64,
    pub federation_id: u64,
    pub name: NationName,
    pub code: NationCode,
    pub reputation: Reputation,
    pub confederation: Confederation,
}

impl Nation {
    pub fn new(
        id: u64,
        continent_id: u64,
        federation_id: u64,
        name: NationName,
        code: NationCode,
        reputation: Reputation,
        confederation: Confederation,
    ) -> Self {
        Nation {
            id,
            continent_id,
            federation_id,
            name,
            code,
            reputation,
            confederation,
        }
    }
}
