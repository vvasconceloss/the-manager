import connectDatabase from "../config/database";
import type { Player, PlayerContract } from "../types/player";

class PlayerModel {
  static insertPlayer = async (player: Player) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      INSERT INTO player (
        first_name, last_name, birth_date, position, market_value, current_ability, 
        potential_ability, overall, finishing, crossing, dribbling, heading, 
        tackling, marking, passing, free_kick, acceleration, agility, 
        strength, jumping, vision, decision, positioning, antecipation, 
        aggression, reflexes, handling, diving, fatigue, nation_id
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);

    const insertPlayerResult = databaseStatement.run(player);
    return insertPlayerResult;
  };

  static insertContract = async (playerContract: PlayerContract) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      INSERT INTO player_contract (
        id, salary, start_date, end_date, player_id, club_id
      ) VALUES (
        ?, ?, ?, ?, ?, ?
      )
    `);

    const insertContractResult = databaseStatement.run(playerContract);
    return insertContractResult;
  }
}

export default PlayerModel;