use crate::{
    club::entities::{club::Club, player::Player},
    competition::entities::{competition::Competition, league::League},
    state::simulation::SimulationState,
};
use chrono::NaiveDate;

#[derive(Debug, Clone)]
pub struct GameState {
    pub clubs: Vec<Club>,
    pub players: Vec<Player>,
    pub leagues: Vec<League>,
    pub competitions: Vec<Competition>,

    pub simulation: SimulationState,
}

impl GameState {
    pub fn new(start_date: NaiveDate) -> Self {
        GameState {
            clubs: Vec::new(),
            players: Vec::new(),
            leagues: Vec::new(),
            competitions: Vec::new(),
            simulation: SimulationState::new(start_date),
        }
    }

    pub fn advance_day(&mut self) {
        self.simulation.advance_day();

        self.run_daily_tasks();

        self.process_matches_for_day();

        if self.is_end_of_season() {
            self.handle_season_end();
        }
    }

    pub fn run_daily_tasks(&mut self) {
        todo!()
    }

    pub fn process_matches_for_day(&mut self) {
        todo!()
    }

    pub fn is_end_of_season(&self) -> bool {
        false
    }

    pub fn handle_season_end(&mut self) {
        todo!()
    }
}
