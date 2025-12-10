use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum CompetitionType {
    Cup,
    League,
    Custom,
    Friendly,
}
