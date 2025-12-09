use serde::{Deserialize, Serialize};

use crate::errors::CoreError;

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq, Eq)]
pub enum PositionGroup {
    Goalkeeper,
    Defense,
    Midfield,
    Forward,
}

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq, Eq)]
pub enum PositionType {
    Goalkeeper,
    CentreBack,
    LeftBack,
    RightBack,
    LeftWingBack,
    RightWingBack,
    DefensiveMidfield,
    CentralMidfield,
    LeftMidfield,
    RightMidfield,
    AttackingMidfield,
    LeftWinger,
    RightWinger,
    Striker,
}

impl TryFrom<String> for PositionType {
    type Error = CoreError;

    fn try_from(value: String) -> Result<Self, Self::Error> {
        match value.as_str() {
            "GK" => Ok(PositionType::Goalkeeper),
            "CB" => Ok(PositionType::CentreBack),
            "LB" => Ok(PositionType::LeftBack),
            "RB" => Ok(PositionType::RightBack),
            "LWB" => Ok(PositionType::LeftWingBack),
            "RWB" => Ok(PositionType::RightWingBack),
            "DM" => Ok(PositionType::DefensiveMidfield),
            "CM" => Ok(PositionType::CentralMidfield),
            "LM" => Ok(PositionType::LeftMidfield),
            "RM" => Ok(PositionType::RightMidfield),
            "AM" => Ok(PositionType::AttackingMidfield),
            "LW" => Ok(PositionType::LeftWinger),
            "RW" => Ok(PositionType::RightWinger),
            "ST" => Ok(PositionType::Striker),
            _ => Err(CoreError::ValidationFailed(format!(
                "Invalid position type: {}",
                value
            ))),
        }
    }
}

impl PositionType {
    pub fn get_short_name(&self) -> &'static str {
        match self {
            PositionType::Goalkeeper => "GK",
            PositionType::CentreBack => "CB",
            PositionType::LeftBack => "LB",
            PositionType::RightBack => "RB",
            PositionType::LeftWingBack => "LWB",
            PositionType::RightWingBack => "RWB",
            PositionType::DefensiveMidfield => "DM",
            PositionType::CentralMidfield => "CM",
            PositionType::LeftMidfield => "LM",
            PositionType::RightMidfield => "RM",
            PositionType::AttackingMidfield => "AM",
            PositionType::LeftWinger => "LW",
            PositionType::RightWinger => "RW",
            PositionType::Striker => "ST",
        }
    }

    pub fn position_category(&self) -> PositionGroup {
        match self {
            PositionType::Goalkeeper => PositionGroup::Goalkeeper,
            PositionType::CentreBack
            | PositionType::LeftBack
            | PositionType::RightBack
            | PositionType::LeftWingBack
            | PositionType::RightWingBack
            | PositionType::DefensiveMidfield => PositionGroup::Defense,
            PositionType::CentralMidfield
            | PositionType::LeftMidfield
            | PositionType::RightMidfield
            | PositionType::AttackingMidfield => PositionGroup::Midfield,
            PositionType::LeftWinger | PositionType::RightWinger | PositionType::Striker => {
                PositionGroup::Forward
            }
        }
    }

    pub fn is_goalkeeper(&self) -> bool {
        self.position_category() == PositionGroup::Goalkeeper
    }

    pub fn is_defender(&self) -> bool {
        self.position_category() == PositionGroup::Defense
    }

    pub fn is_midfielder(&self) -> bool {
        self.position_category() == PositionGroup::Midfield
    }

    pub fn is_forward(&self) -> bool {
        self.position_category() == PositionGroup::Forward
    }
}
