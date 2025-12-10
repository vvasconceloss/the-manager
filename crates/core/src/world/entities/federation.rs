use crate::{
    shared::value_objects::reputation::Reputation,
    world::value_objects::federation::name::FederationName,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Federation {
    pub id: u64,
    pub name: FederationName,
    pub reputation: Reputation,
}

impl Federation {
    pub fn new(id: u64, name: FederationName, reputation: Reputation) -> Self {
        Federation {
            id,
            name,
            reputation,
        }
    }
}
