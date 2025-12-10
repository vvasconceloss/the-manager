use crate::{shared::reputation::Reputation, world::federation::federation_name::FederationName};
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
