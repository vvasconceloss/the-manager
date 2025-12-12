use crate::{
    club::value_objects::player::contract::{
        contract_role::PlayerContractRole, contract_type::PlayerContractType,
    },
    shared::value_objects::money::Money,
};

#[derive(Debug, Clone)]
pub struct PlayerContract {
    pub id: u64,
    pub club: u64,
    pub player: u64,
    pub wage: Money,
    pub contract_type: PlayerContractType,
    pub contract_role: PlayerContractRole,
    pub expires: String,
    pub started: Option<String>,
}

impl PlayerContract {
    pub fn new(
        id: u64,
        club: u64,
        player: u64,
        wage: Money,
        contract_type: PlayerContractType,
        contract_role: PlayerContractRole,
        expires: String,
        started: Option<String>,
    ) -> Self {
        Self {
            id,
            club,
            player,
            wage,
            contract_type,
            contract_role,
            expires,
            started,
        }
    }
}
