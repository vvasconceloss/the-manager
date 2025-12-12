use chrono::NaiveDate;

#[derive(Debug, Clone)]
pub struct SimulationState {
    pub date: NaiveDate,
}

impl SimulationState {
    pub fn new(date: NaiveDate) -> Self {
        SimulationState { date }
    }

    pub fn set_date(&mut self, date: NaiveDate) {
        self.date = date;
    }

    pub fn formatted_date(&self) -> String {
        self.date.format("%Y-%m-%d").to_string()
    }

    pub fn advance_day(&mut self) {
        self.date = self.date.succ_opt().unwrap();
    }

    pub fn is_before(&self, other: NaiveDate) -> bool {
        self.date < other
    }
}
