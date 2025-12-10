use crate::world::value_objects::stadium::name::StadiumName;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stadium {
    pub id: u64,
    pub nation_id: u64,
    pub name: StadiumName,
    pub capacity: u64,
}

impl Stadium {
    pub fn new(id: u64, nation_id: u64, name: StadiumName, capacity: u64) -> Self {
        Stadium {
            id,
            nation_id,
            name,
            capacity,
        }
    }
}
