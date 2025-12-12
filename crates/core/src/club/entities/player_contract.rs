use crate::{
    club::value_objects::player::contract::{
        contract_role::PlayerContractRole, contract_type::PlayerContractType,
    },
    shared::value_objects::money::Money,
};
use chrono::NaiveDate;

#[derive(Debug, Clone)]
pub struct PlayerContract {
    pub id: u64,
    pub club_id: u64,
    pub player_id: u64,
    pub wage: Money,
    pub contract_type: PlayerContractType,
    pub contract_role: PlayerContractRole,
    pub expires: NaiveDate,
    pub started: Option<NaiveDate>,
}

impl PlayerContract {
    pub fn new(
        id: u64,
        club_id: u64,
        player_id: u64,
        wage: Money,
        contract_type: PlayerContractType,
        contract_role: PlayerContractRole,
        expires: NaiveDate,
        started: Option<NaiveDate>,
    ) -> Self {
        Self {
            id,
            club_id,
            player_id,
            wage,
            contract_type,
            contract_role,
            expires,
            started,
        }
    }
}
