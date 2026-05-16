use rusqlite::Connection;
use rusqlite_migration::{Error, Migrations, M};

pub fn run(conn: &mut Connection) -> Result<(), Error> {
    let migrations = Migrations::new(vec![M::up(include_str!(
        "../../migrations/V1__initial_schema.sql"
    ))]);

    migrations.to_latest(conn)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn v1_creates_expected_tables() {
        let mut conn = Connection::open_in_memory().unwrap();
        run(&mut conn).unwrap();

        let tables: Vec<String> = conn
            .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
            .unwrap()
            .query_map([], |row| row.get(0))
            .unwrap()
            .filter_map(Result::ok)
            .collect();

        assert_eq!(
            tables,
            vec![
                "attribute_type",
                "city",
                "club",
                "club_budget",
                "club_finance_summary",
                "competition",
                "competition_season",
                "confederation",
                "financial_transaction",
                "fixture",
                "formation",
                "formation_position",
                "game_state",
                "league_standing",
                "lineup",
                "loan_details",
                "match_lineup",
                "nation",
                "player",
                "player_attribute",
                "player_contract",
                "player_match_stats",
                "player_position",
                "player_season_stats",
                "season",
                "stadium",
                "staff",
                "staff_attribute",
                "staff_attribute_type",
                "staff_contract",
                "staff_function_type",
                "tactic",
                "tactic_instruction",
                "tactic_instruction_type",
                "tactical_style_type",
                "transaction_category",
                "transaction_type",
                "transfer",
                "transfer_type",
                "transfer_window",
                "transfer_window_type",
            ]
        );
    }
}
