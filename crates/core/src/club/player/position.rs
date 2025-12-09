use crate::{club::player::position_type::PositionType, errors::CoreError};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq, Eq)]
pub struct Position {
    pub proficiency: u8,
    pub position: PositionType,
}

impl Position {
    const MIN_VALUE: u8 = 1;
    const MAX_VALUE: u8 = 5;

    pub fn new(position: PositionType, proficiency: u8) -> Result<Self, CoreError> {
        if !(Self::MIN_VALUE..=Self::MAX_VALUE).contains(&proficiency) {
            return Err(CoreError::ValidationFailed(format!(
                "Proficiency must be between {0} and {1}",
                Self::MIN_VALUE,
                Self::MAX_VALUE
            )));
        }

        Ok(Position {
            position,
            proficiency,
        })
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq, Eq)]
pub struct PlayerPositions {
    pub positions: Vec<Position>,
}

impl PlayerPositions {
    pub fn new(positions: Vec<Position>) -> Self {
        PlayerPositions { positions }
    }

    pub fn positions(&self) -> Vec<PositionType> {
        self.positions
            .iter()
            .filter(|p| p.proficiency >= 15)
            .map(|p| p.position.clone())
            .collect()
    }

    pub fn add_position(&mut self, position: Position) {
        self.positions.push(position);
    }

    pub fn has_position(&self, position: PositionType) -> bool {
        self.positions.iter().any(|p| p.position == position)
    }

    pub fn position_proficiency(&self, position: PositionType) -> u8 {
        match self.positions.iter().find(|p| p.position == position) {
            Some(p) => p.proficiency,
            None => 0,
        }
    }

    pub fn is_goalkeeper(&self) -> bool {
        self.positions
            .iter()
            .any(|p| p.position == PositionType::Goalkeeper)
    }
}
