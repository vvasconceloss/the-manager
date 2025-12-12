#[derive(Debug, Clone)]
pub struct SimulationState {
    pub day: u8,
    pub month: u8,
    pub year: u64,
}

impl SimulationState {
    pub fn new(day: u8, month: u8, year: u64) -> Self {
        SimulationState { day, month, year }
    }
}
