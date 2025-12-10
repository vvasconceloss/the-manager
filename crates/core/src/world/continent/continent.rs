use crate::world::continent::continent_name::ContinentName;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Continent {
    pub id: u64,
    pub name: ContinentName,
}

impl Continent {
    pub fn new(id: u64, name: ContinentName) -> Self {
        Continent { id, name }
    }
}
