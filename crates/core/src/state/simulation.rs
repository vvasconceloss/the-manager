use chrono::NaiveDate;

#[derive(Debug, Clone)]
pub struct SimulationState {
    pub date: NaiveDate,
}

impl SimulationState {
    pub fn new(date: NaiveDate) -> Self {
        SimulationState { date }
    }

    pub fn advance_day(&mut self) {
        self.date = self.date.succ_opt().unwrap();
    }
}
