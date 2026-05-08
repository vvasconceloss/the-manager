-- =============================================================================
-- SECTION 1 — LOOKUP / REFERENCE
-- Tables with no external dependencies.
-- =============================================================================
--
CREATE TABLE IF NOT EXISTS player_position (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL,         -- ex: 'Goalkeeper', 'Centre Back'
    code TEXT NOT NULL UNIQUE   -- ex: 'GK', 'CB', 'LB', 'CM', 'ST'
);

CREATE INDEX IF NOT EXISTS idx_player_position_code ON player_position (code);

CREATE TABLE IF NOT EXISTS attribute_type (
    id       INTEGER PRIMARY KEY,
    name     TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('technical', 'physical', 'mental', 'goalkeeper'))
);

CREATE INDEX IF NOT EXISTS idx_attribute_type_category ON attribute_type (category);

CREATE TABLE IF NOT EXISTS staff_function_type (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE  -- ex: 'Manager', 'Assistant Manager', 'Coach'
);

CREATE TABLE IF NOT EXISTS staff_attribute_type (
    id       INTEGER PRIMARY KEY,
    name     TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('coaching', 'scouting', 'mental'))
);

CREATE INDEX IF NOT EXISTS idx_staff_attribute_type_category ON staff_attribute_type (category);

CREATE TABLE IF NOT EXISTS tactical_style_type (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,  -- ex: 'Attacking', 'Defensive', 'Possession'
    description TEXT
);

CREATE TABLE IF NOT EXISTS transfer_type (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
        CHECK (name IN ('Permanent', 'Loan', 'Free Transfer', 'Retirement', 'Release'))
);

CREATE TABLE IF NOT EXISTS transfer_window_type (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE  -- ex: 'Summer', 'Winter'
);

CREATE TABLE IF NOT EXISTS transaction_type (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE CHECK (name IN ('Revenue', 'Expense'))
);

CREATE TABLE IF NOT EXISTS transaction_category (
    id                  INTEGER PRIMARY KEY,
    name                TEXT NOT NULL UNIQUE,    -- ex: 'Match Revenue', 'Player Wage'
    transaction_type_id INTEGER NOT NULL REFERENCES transaction_type (id)
);

CREATE INDEX IF NOT EXISTS idx_transaction_category_type
    ON transaction_category (transaction_type_id);

CREATE TABLE IF NOT EXISTS formation (
    id               INTEGER PRIMARY KEY,
    name             TEXT NOT NULL UNIQUE,  -- ex: '4-3-3 Attacking'
    formation_string TEXT NOT NULL          -- ex: '4-3-3'
);

CREATE TABLE IF NOT EXISTS tactic_instruction_type (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    description TEXT,
    value_type  TEXT NOT NULL CHECK (value_type IN ('text', 'integer', 'boolean'))
);

-- =============================================================================
-- SECTION 2 — GEOGRAPHY
-- confederation → nation → city / stadium
-- =============================================================================

CREATE TABLE IF NOT EXISTS confederation (
    id              INTEGER PRIMARY KEY,
    name            TEXT NOT NULL UNIQUE,
    continent       TEXT NOT NULL CHECK (continent IN ('europe', 'south_america', 'africa', 'asia', 'north_america', 'oceania')),
    foundation_year INTEGER NOT NULL,
    asset_path      TEXT    -- ex: 'assets/confederations/uefa.webp'
);

CREATE INDEX IF NOT EXISTS idx_confederation_continent ON confederation (continent);

CREATE TABLE IF NOT EXISTS nation (
    id                    INTEGER PRIMARY KEY,
    name                  TEXT NOT NULL,
    reputation            INTEGER NOT NULL CHECK (reputation BETWEEN 1 AND 100),
    federation_name       TEXT NOT NULL,
    confederation_id      INTEGER NOT NULL REFERENCES confederation (id),
    flag_asset_path       TEXT,        -- ex: 'assets/flags/pt.webp'
    federation_asset_path TEXT
);

CREATE INDEX IF NOT EXISTS idx_nation_name          ON nation (name);
CREATE INDEX IF NOT EXISTS idx_nation_confederation ON nation (confederation_id);

CREATE TABLE IF NOT EXISTS city (
    id        INTEGER PRIMARY KEY,
    name      TEXT NOT NULL,
    nation_id INTEGER NOT NULL REFERENCES nation (id)
);

CREATE INDEX IF NOT EXISTS idx_city_nation ON city (nation_id);

CREATE TABLE IF NOT EXISTS stadium (
    id        INTEGER PRIMARY KEY,
    name      TEXT NOT NULL,
    capacity  INTEGER NOT NULL CHECK (capacity > 0),
    nation_id INTEGER NOT NULL REFERENCES nation (id)
);

CREATE INDEX IF NOT EXISTS idx_stadium_nation ON stadium (nation_id);

-- =============================================================================
-- SECTION 3 — COMPETITION AND SEASON
-- =============================================================================

-- Supports national leagues (nation_id), cups (nation_id), and
-- European competitions (confederation_id). One of the two may be NULL, depending on the type.
CREATE TABLE IF NOT EXISTS competition (
    id                 INTEGER PRIMARY KEY,
    name               TEXT NOT NULL,
    type               TEXT NOT NULL CHECK (type IN ('league', 'cup', 'combination')),
    reputation         INTEGER NOT NULL CHECK (reputation BETWEEN 1 AND 10000),
    confederation_id   INTEGER REFERENCES confederation (id),  -- NULL for national competitions
    nation_id          INTEGER REFERENCES nation (id),         -- NULL for continental competitions
    has_group_stage    INTEGER NOT NULL DEFAULT 0 CHECK (has_group_stage IN (0, 1)),
    has_knockout_stage INTEGER NOT NULL DEFAULT 0 CHECK (has_knockout_stage IN (0, 1)),
    knockout_legs      TEXT NOT NULL DEFAULT 'single_leg'
                           CHECK (knockout_legs IN ('single_leg', 'two_legs')),
    logo_asset_path    TEXT
);

CREATE INDEX IF NOT EXISTS idx_competition_nation        ON competition (nation_id);
CREATE INDEX IF NOT EXISTS idx_competition_confederation ON competition (confederation_id);

CREATE TABLE IF NOT EXISTS season (
    id         INTEGER PRIMARY KEY,
    year       INTEGER NOT NULL,
    start_date TEXT NOT NULL CHECK (start_date GLOB '????-??-??'),
    end_date   TEXT NOT NULL CHECK (end_date GLOB '????-??-??'),
    status     TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'finished')),
    CHECK (start_date < end_date)
);

-- Which competition corresponds to which season
CREATE TABLE IF NOT EXISTS competition_season (
    competition_id INTEGER NOT NULL REFERENCES competition (id),
    season_id      INTEGER NOT NULL REFERENCES season (id),
    PRIMARY KEY (competition_id, season_id)
);

CREATE INDEX IF NOT EXISTS idx_competition_season_season ON competition_season (season_id);

-- =============================================================================
-- SECTION 4 — CLUB
-- =============================================================================

CREATE TABLE IF NOT EXISTS club (
    id              INTEGER PRIMARY KEY,
    name            TEXT NOT NULL,
    short_name      TEXT NOT NULL,
    abbreviation    TEXT NOT NULL,
    nation_id       INTEGER NOT NULL REFERENCES nation (id),
    city_id         INTEGER NOT NULL REFERENCES city (id),
    stadium_id      INTEGER NOT NULL REFERENCES stadium (id),
    league_id       INTEGER NOT NULL REFERENCES competition (id),
    reputation      INTEGER NOT NULL CHECK (reputation BETWEEN 1 AND 100),
    foundation_year INTEGER NOT NULL,
    logo_asset_path TEXT
);

CREATE INDEX IF NOT EXISTS idx_club_nation  ON club (nation_id);
CREATE INDEX IF NOT EXISTS idx_club_league  ON club (league_id);

-- =============================================================================
-- SECTION 5 — STAFF (includes the user's manager: is_user = 1)
--
-- The manager does not have his own table. He is a staff member with is_user = 1.
-- His contract with the club is stored in staff_contract.
-- His attributes (coaching, scouting, mental) are stored in staff_attribute.
-- =============================================================================

CREATE TABLE IF NOT EXISTS staff (
    id                INTEGER PRIMARY KEY,
    first_name        TEXT NOT NULL,
    last_name         TEXT NOT NULL,
    birth_date        TEXT NOT NULL CHECK (birth_date GLOB '????-??-??'),
    nation_id         INTEGER NOT NULL REFERENCES nation (id),
    function_id       INTEGER NOT NULL REFERENCES staff_function_type (id),
    tactical_style_id INTEGER NOT NULL REFERENCES tactical_style_type (id),
    is_user           INTEGER NOT NULL DEFAULT 0 CHECK (is_user IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_staff_nation    ON staff (nation_id);
CREATE INDEX IF NOT EXISTS idx_staff_function  ON staff (function_id);
CREATE INDEX IF NOT EXISTS idx_staff_is_user   ON staff (is_user);
CREATE INDEX IF NOT EXISTS idx_staff_name      ON staff (last_name, first_name);

CREATE TABLE IF NOT EXISTS staff_attribute (
    staff_id               INTEGER NOT NULL REFERENCES staff (id),
    staff_attribute_type_id INTEGER NOT NULL REFERENCES staff_attribute_type (id),
    value                  INTEGER NOT NULL CHECK (value BETWEEN 1 AND 20),
    PRIMARY KEY (staff_id, staff_attribute_type_id)
);

CREATE INDEX IF NOT EXISTS idx_staff_attribute_staff ON staff_attribute (staff_id);

CREATE TABLE IF NOT EXISTS staff_contract (
    id         INTEGER PRIMARY KEY,
    staff_id   INTEGER NOT NULL REFERENCES staff (id),
    club_id    INTEGER NOT NULL REFERENCES club (id),
    start_date TEXT NOT NULL CHECK (start_date GLOB '????-??-??'),
    end_date   TEXT NOT NULL CHECK (end_date GLOB '????-??-??'),
    salary     INTEGER NOT NULL CHECK (salary >= 0),
    UNIQUE (staff_id, club_id, start_date),
    CHECK (start_date < end_date)
);

CREATE INDEX IF NOT EXISTS idx_staff_contract_staff ON staff_contract (staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_contract_club  ON staff_contract (club_id);

-- =============================================================================
-- SECTION 6 — PLAYER
-- =============================================================================

CREATE TABLE IF NOT EXISTS player (
    id           INTEGER PRIMARY KEY,
    first_name   TEXT NOT NULL,
    last_name    TEXT NOT NULL,
    birth_date   TEXT NOT NULL CHECK (birth_date GLOB '????-??-??'),
    overall      INTEGER NOT NULL CHECK (overall BETWEEN 1 AND 99),
    potential    INTEGER NOT NULL CHECK (potential BETWEEN 1 AND 99),
    market_value INTEGER NOT NULL DEFAULT 0 CHECK (market_value >= 0),
    position_id  INTEGER NOT NULL REFERENCES player_position (id),
    nation_id    INTEGER NOT NULL REFERENCES nation (id)
);

CREATE INDEX IF NOT EXISTS idx_player_position ON player (position_id);
CREATE INDEX IF NOT EXISTS idx_player_nation   ON player (nation_id);
CREATE INDEX IF NOT EXISTS idx_player_overall  ON player (overall DESC);
CREATE INDEX IF NOT EXISTS idx_player_name     ON player (last_name, first_name);

-- Individual attributes per player (e.g., Pace = 85, Shooting = 72)
CREATE TABLE IF NOT EXISTS player_attribute (
    player_id         INTEGER NOT NULL REFERENCES player (id),
    attribute_type_id INTEGER NOT NULL REFERENCES attribute_type (id),
    value             INTEGER NOT NULL CHECK (value BETWEEN 1 AND 99),
    PRIMARY KEY (player_id, attribute_type_id)
);

CREATE INDEX IF NOT EXISTS idx_player_attribute_player    ON player_attribute (player_id);
CREATE INDEX IF NOT EXISTS idx_player_attribute_type      ON player_attribute (attribute_type_id);

CREATE TABLE IF NOT EXISTS player_contract (
    id         INTEGER PRIMARY KEY,
    player_id  INTEGER NOT NULL REFERENCES player (id),
    club_id    INTEGER NOT NULL REFERENCES club (id),
    wage       INTEGER NOT NULL CHECK (wage > 0),
    start_date TEXT NOT NULL CHECK (start_date GLOB '????-??-??'),
    end_date   TEXT NOT NULL CHECK (end_date GLOB '????-??-??'),
    -- 'active'          → current contract
    -- 'transfer_listed' → on the market, contract still active
    -- 'expired'         → end of the season, contract not renewed
    status     TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'transfer_listed', 'expired')),
    UNIQUE (player_id, club_id, start_date),
    CHECK (start_date < end_date)
);

CREATE INDEX IF NOT EXISTS idx_player_contract_player       ON player_contract (player_id);
CREATE INDEX IF NOT EXISTS idx_player_contract_club         ON player_contract (club_id);
-- Composite index: the most common query is “active contracts for this club”
CREATE INDEX IF NOT EXISTS idx_player_contract_club_status  ON player_contract (club_id, status);

-- =============================================================================
-- SECTION 7 — TACTICS AND LINEUP
-- =============================================================================

-- Positions of each formation with optional coordinates for visual rendering
CREATE TABLE IF NOT EXISTS formation_position (
    id                 INTEGER PRIMARY KEY,
    formation_id       INTEGER NOT NULL REFERENCES formation (id),
    player_position_id INTEGER NOT NULL REFERENCES player_position (id),
    x_coord            INTEGER,  -- optional, for front-end rendering
    y_coord            INTEGER,  -- optional, for front-end rendering
    position_order     INTEGER,
    UNIQUE (formation_id, player_position_id)
);

CREATE INDEX IF NOT EXISTS idx_formation_position_formation ON formation_position (formation_id);

-- User-defined tactic (formation + name)
-- A club can have multiple tactics; is_default = 1 indicates the active one
CREATE TABLE IF NOT EXISTS tactic (
    id           INTEGER PRIMARY KEY,
    club_id      INTEGER NOT NULL REFERENCES club (id),
    name         TEXT NOT NULL,
    formation_id INTEGER NOT NULL REFERENCES formation (id),
    is_default   INTEGER NOT NULL DEFAULT 0 CHECK (is_default IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_tactic_club       ON tactic (club_id);
CREATE INDEX IF NOT EXISTS idx_tactic_default    ON tactic (club_id, is_default);

-- Tactical instructions for a specific tactic (e.g., pressing = ‘High’)
CREATE TABLE IF NOT EXISTS tactic_instruction (
    id                  INTEGER PRIMARY KEY,
    tactic_id           INTEGER NOT NULL REFERENCES tactic (id),
    instruction_type_id INTEGER NOT NULL REFERENCES tactic_instruction_type (id),
    value               TEXT NOT NULL,
    UNIQUE (tactic_id, instruction_type_id)
);

CREATE INDEX IF NOT EXISTS idx_tactic_instruction_tactic ON tactic_instruction (tactic_id);

-- Pre-match lineup: user-editable lineup for upcoming matches.
-- One registration per position per season per club.
CREATE TABLE IF NOT EXISTS lineup (
    id         INTEGER PRIMARY KEY,
    club_id    INTEGER NOT NULL REFERENCES club (id),
    season_id  INTEGER NOT NULL REFERENCES season (id),
    position_id INTEGER NOT NULL REFERENCES player_position (id),
    player_id  INTEGER NOT NULL REFERENCES player (id),
    UNIQUE (club_id, season_id, position_id)
);

CREATE INDEX IF NOT EXISTS idx_lineup_club_season ON lineup (club_id, season_id);

-- =============================================================================
-- SECTION 8 — GAME STATE
--
-- game_state: current date and active season.
-- CHECK (id = 1) ensures that there are never multiple records.
-- =============================================================================

CREATE TABLE IF NOT EXISTS game_state (
    id           INTEGER PRIMARY KEY CHECK (id = 1),
    current_date TEXT NOT NULL CHECK (current_date GLOB '????-??-??'),
    season_id    INTEGER NOT NULL REFERENCES season (id),
    user_club_id  INTEGER NOT NULL REFERENCES club (id),
    user_staff_id INTEGER NOT NULL REFERENCES staff (id)
);

-- =============================================================================
-- SECTION 9 — FIXTURES
-- =============================================================================

-- Fixture = a scheduled or completed match.
-- home_goals / away_goals are NULL until status = ‘completed’.
CREATE TABLE IF NOT EXISTS fixture (
    id             INTEGER PRIMARY KEY,
    competition_id INTEGER NOT NULL REFERENCES competition (id),
    season_id      INTEGER NOT NULL REFERENCES season (id),
    home_club_id   INTEGER NOT NULL REFERENCES club (id),
    away_club_id   INTEGER NOT NULL REFERENCES club (id),
    scheduled_date TEXT NOT NULL CHECK (scheduled_date GLOB '????-??-??'),
    status         TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'postponed')),
    home_goals     INTEGER,  -- NULL while scheduled / postponed
    away_goals     INTEGER,  -- NULL while scheduled / postponed
    leg_number     INTEGER NOT NULL DEFAULT 1,
    CHECK (home_club_id != away_club_id)
);

CREATE INDEX IF NOT EXISTS idx_fixture_status    ON fixture (status);
CREATE INDEX IF NOT EXISTS idx_fixture_season    ON fixture (season_id);
CREATE INDEX IF NOT EXISTS idx_fixture_date      ON fixture (scheduled_date);
CREATE INDEX IF NOT EXISTS idx_fixture_home_club ON fixture (home_club_id);
CREATE INDEX IF NOT EXISTS idx_fixture_away_club ON fixture (away_club_id);

-- Lineup registered for a specific match that has already been completed.
-- Cannot be changed after the match has been simulated.
-- Separate from `lineup` (which is editable and represents the next match).
CREATE TABLE IF NOT EXISTS match_lineup (
    id                 INTEGER PRIMARY KEY,
    fixture_id         INTEGER NOT NULL REFERENCES fixture (id),
    club_id            INTEGER NOT NULL REFERENCES club (id),
    player_id          INTEGER NOT NULL REFERENCES player (id),
    position_played_id INTEGER REFERENCES player_position (id),
    is_starter         INTEGER NOT NULL DEFAULT 1 CHECK (is_starter IN (0, 1)),
    is_captain         INTEGER NOT NULL DEFAULT 0 CHECK (is_captain IN (0, 1)),
    jersey_number      INTEGER,
    UNIQUE (fixture_id, club_id, player_id)
);

CREATE INDEX IF NOT EXISTS idx_match_lineup_fixture ON match_lineup (fixture_id);
CREATE INDEX IF NOT EXISTS idx_match_lineup_club    ON match_lineup (club_id);
CREATE INDEX IF NOT EXISTS idx_match_lineup_player  ON match_lineup (player_id);

-- =============================================================================
-- SECTION 10 — CLASSIFICATIONS AND STATISTICS
-- =============================================================================

-- Snapshot of the standings by match day.
-- Storing data by match_day allows for historical data and trend charts.
CREATE TABLE IF NOT EXISTS league_standing (
    id              INTEGER PRIMARY KEY,
    competition_id  INTEGER NOT NULL,
    season_id       INTEGER NOT NULL,
    club_id         INTEGER NOT NULL REFERENCES club (id),
    match_day       INTEGER NOT NULL,
    position        INTEGER NOT NULL CHECK (position > 0),
    played          INTEGER NOT NULL DEFAULT 0,
    wins            INTEGER NOT NULL DEFAULT 0,
    draws           INTEGER NOT NULL DEFAULT 0,
    losses          INTEGER NOT NULL DEFAULT 0,
    goals_for       INTEGER NOT NULL DEFAULT 0,
    goals_against   INTEGER NOT NULL DEFAULT 0,
    goal_difference INTEGER NOT NULL DEFAULT 0,
    points          INTEGER NOT NULL DEFAULT 0,
    UNIQUE (competition_id, season_id, club_id, match_day),
    FOREIGN KEY (competition_id, season_id) REFERENCES competition_season (competition_id, season_id)
);

CREATE INDEX IF NOT EXISTS idx_league_standing_club         ON league_standing (club_id);
CREATE INDEX IF NOT EXISTS idx_league_standing_comp_season  ON league_standing (competition_id, season_id);
CREATE INDEX IF NOT EXISTS idx_league_standing_match_day    ON league_standing (match_day);

-- Individual statistics per player per game.
CREATE TABLE IF NOT EXISTS player_match_stats (
    id               INTEGER PRIMARY KEY,
    player_id        INTEGER NOT NULL REFERENCES player (id),
    club_id          INTEGER NOT NULL REFERENCES club (id),
    fixture_id       INTEGER NOT NULL REFERENCES fixture (id),
    rating           REAL    NOT NULL CHECK (rating BETWEEN 0.0 AND 10.0),
    goals            INTEGER NOT NULL DEFAULT 0 CHECK (goals >= 0),
    assists          INTEGER NOT NULL DEFAULT 0 CHECK (assists >= 0),
    shots            INTEGER NOT NULL DEFAULT 0 CHECK (shots >= 0),
    shots_on_target  INTEGER NOT NULL DEFAULT 0 CHECK (shots_on_target >= 0),
    passes           INTEGER NOT NULL DEFAULT 0 CHECK (passes >= 0),
    tackles_won      INTEGER NOT NULL DEFAULT 0 CHECK (tackles_won >= 0),
    interceptions    INTEGER NOT NULL DEFAULT 0 CHECK (interceptions >= 0),
    fouls_committed  INTEGER NOT NULL DEFAULT 0 CHECK (fouls_committed >= 0),
    yellow_cards     INTEGER NOT NULL DEFAULT 0 CHECK (yellow_cards IN (0, 1, 2)),
    red_cards        INTEGER NOT NULL DEFAULT 0 CHECK (red_cards IN (0, 1)),
    is_motm          INTEGER NOT NULL DEFAULT 0 CHECK (is_motm IN (0, 1)),
    UNIQUE (player_id, fixture_id)
);

CREATE INDEX IF NOT EXISTS idx_player_match_stats_player  ON player_match_stats (player_id);
CREATE INDEX IF NOT EXISTS idx_player_match_stats_fixture ON player_match_stats (fixture_id);
CREATE INDEX IF NOT EXISTS idx_player_match_stats_club    ON player_match_stats (club_id);

-- Cumulative statistics per player per season.
-- competition_id may be NULL (aggregated totals from all competitions).
CREATE TABLE IF NOT EXISTS player_season_stats (
    id             INTEGER PRIMARY KEY,
    player_id      INTEGER NOT NULL REFERENCES player (id),
    club_id        INTEGER NOT NULL REFERENCES club (id),
    season_id      INTEGER NOT NULL REFERENCES season (id),
    competition_id INTEGER REFERENCES competition (id),
    matches_played INTEGER NOT NULL DEFAULT 0,
    goals          INTEGER NOT NULL DEFAULT 0,
    assists        INTEGER NOT NULL DEFAULT 0,
    minutes_played INTEGER NOT NULL DEFAULT 0,
    average_rating REAL,
    UNIQUE (player_id, club_id, season_id, competition_id)
);

CREATE INDEX IF NOT EXISTS idx_player_season_stats_player  ON player_season_stats (player_id);
CREATE INDEX IF NOT EXISTS idx_player_season_stats_season  ON player_season_stats (season_id);
CREATE INDEX IF NOT EXISTS idx_player_season_stats_club    ON player_season_stats (club_id);

-- =============================================================================
-- SECTION 11 — FINANCE
-- =============================================================================

-- Budget allocated at the start of each season
CREATE TABLE IF NOT EXISTS club_budget (
    id                        INTEGER PRIMARY KEY,
    club_id                   INTEGER NOT NULL REFERENCES club (id),
    season_id                 INTEGER NOT NULL REFERENCES season (id),
    transfer_budget_allocated INTEGER NOT NULL DEFAULT 0 CHECK (transfer_budget_allocated >= 0),
    salary_budget_allocated   INTEGER NOT NULL DEFAULT 0 CHECK (salary_budget_allocated >= 0),
    initial_cash_balance      INTEGER NOT NULL DEFAULT 0,
    UNIQUE (club_id, season_id)
);

CREATE INDEX IF NOT EXISTS idx_club_budget_club   ON club_budget (club_id);
CREATE INDEX IF NOT EXISTS idx_club_budget_season ON club_budget (season_id);

-- The club's current financial status (balance + available funds)
-- One row per club. Updated after each transaction.
CREATE TABLE IF NOT EXISTS club_finance_summary (
    club_id                   INTEGER PRIMARY KEY REFERENCES club (id),
    current_balance           INTEGER NOT NULL DEFAULT 0,
    transfer_budget_available INTEGER NOT NULL DEFAULT 0 CHECK (transfer_budget_available >= 0),
    salary_budget_available   INTEGER NOT NULL DEFAULT 0 CHECK (salary_budget_available >= 0),
    last_updated_date         TEXT NOT NULL CHECK (last_updated_date GLOB '????-??-??')
);

-- Record of each financial transaction (income and expenses)
-- related_* fields are optional and provide context for the transaction
CREATE TABLE IF NOT EXISTS financial_transaction (
    id                      INTEGER PRIMARY KEY,
    club_id                 INTEGER NOT NULL REFERENCES club (id),
    transaction_category_id INTEGER NOT NULL REFERENCES transaction_category (id),
    amount                  INTEGER NOT NULL,  -- always positive; the sign determines the direction
    transaction_date        TEXT NOT NULL CHECK (transaction_date GLOB '????-??-??'),
    description             TEXT,
    related_player_id       INTEGER REFERENCES player (id),
    related_staff_id        INTEGER REFERENCES staff (id),
    related_fixture_id      INTEGER REFERENCES fixture (id),
    related_club_id         INTEGER REFERENCES club (id)
);

CREATE INDEX IF NOT EXISTS idx_financial_transaction_club       ON financial_transaction (club_id);
CREATE INDEX IF NOT EXISTS idx_financial_transaction_date       ON financial_transaction (transaction_date);
CREATE INDEX IF NOT EXISTS idx_financial_transaction_category   ON financial_transaction (transaction_category_id);
CREATE INDEX IF NOT EXISTS idx_financial_transaction_player     ON financial_transaction (related_player_id);

-- =============================================================================
-- SECTION 12 — TRANSFERS
-- =============================================================================

-- Seasonal transfer windows
CREATE TABLE IF NOT EXISTS transfer_window (
    id                      INTEGER PRIMARY KEY,
    season_id               INTEGER NOT NULL REFERENCES season (id),
    transfer_window_type_id INTEGER NOT NULL REFERENCES transfer_window_type (id),
    start_date              TEXT NOT NULL CHECK (start_date GLOB '????-??-??'),
    end_date                TEXT NOT NULL CHECK (end_date GLOB '????-??-??'),
    UNIQUE (season_id, transfer_window_type_id, start_date),
    CHECK (start_date < end_date)
);

CREATE INDEX IF NOT EXISTS idx_transfer_window_season   ON transfer_window (season_id);
CREATE INDEX IF NOT EXISTS idx_transfer_window_dates    ON transfer_window (start_date, end_date);

-- Record of each completed or pending transfer
-- club_from_id NULL = original free agent
-- club_to_id NULL = released / retired player
CREATE TABLE IF NOT EXISTS transfer (
    id               INTEGER PRIMARY KEY,
    player_id        INTEGER NOT NULL REFERENCES player (id),
    club_from_id     INTEGER REFERENCES club (id),
    club_to_id       INTEGER REFERENCES club (id),
    transfer_type_id INTEGER NOT NULL REFERENCES transfer_type (id),
    transfer_fee     INTEGER NOT NULL DEFAULT 0 CHECK (transfer_fee >= 0),
    agent_fee        INTEGER NOT NULL DEFAULT 0 CHECK (agent_fee >= 0),
    transfer_date    TEXT NOT NULL CHECK (transfer_date GLOB '????-??-??'),
    status           TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed'))
);

CREATE INDEX IF NOT EXISTS idx_transfer_player     ON transfer (player_id);
CREATE INDEX IF NOT EXISTS idx_transfer_club_from  ON transfer (club_from_id);
CREATE INDEX IF NOT EXISTS idx_transfer_club_to    ON transfer (club_to_id);
CREATE INDEX IF NOT EXISTS idx_transfer_date       ON transfer (transfer_date);
CREATE INDEX IF NOT EXISTS idx_transfer_status     ON transfer (status);

-- Additional details for “Loan” transfers
CREATE TABLE IF NOT EXISTS loan_details (
    transfer_id                   INTEGER PRIMARY KEY REFERENCES transfer (id),
    loan_start_date               TEXT NOT NULL CHECK (loan_start_date GLOB '????-??-??'),
    loan_end_date                 TEXT NOT NULL CHECK (loan_end_date GLOB '????-??-??'),
    loan_fee                      INTEGER NOT NULL DEFAULT 0 CHECK (loan_fee >= 0),
    wage_contribution_percentage  INTEGER NOT NULL DEFAULT 0 CHECK (wage_contribution_percentage BETWEEN 0 AND 100),
    option_to_buy_fee             INTEGER,       -- NULL = no call option
    is_mandatory_buy_option       INTEGER NOT NULL DEFAULT 0 CHECK (is_mandatory_buy_option IN (0, 1)),
    CHECK (loan_start_date < loan_end_date)
);
