use crate::shared::value_objects::attribute::Attribute;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Mental {
    pub vision: Attribute,
    pub decision: Attribute,
    pub composure: Attribute,
    pub positioning: Attribute,
    pub determination: Attribute,
    pub concentration: Attribute,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Physical {
    pub pace: Attribute,
    pub agility: Attribute,
    pub jumping: Attribute,
    pub balance: Attribute,
    pub strength: Attribute,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Technical {
    pub marking: Attribute,
    pub heading: Attribute,
    pub passing: Attribute,
    pub crossing: Attribute,
    pub tackling: Attribute,
    pub finishing: Attribute,
    pub dribbling: Attribute,
    pub first_touch: Attribute,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SetPieces {
    pub corners: Attribute,
    pub penalties: Attribute,
    pub free_kicks: Attribute,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Goalkeeping {
    pub handling: Attribute,
    pub reflexes: Attribute,
    pub distribution: Attribute,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PlayerAttributes {
    pub mental: Mental,
    pub physical: Physical,
    pub technical: Technical,
    pub set_pieces: SetPieces,
    pub goalkeeping: Goalkeeping,
}
