import connectDatabase from "../config/database";
import type { Player, PlayerContract } from "../types/player";

class PlayerModel {
  static fetchInformation = async (playerId: number) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      SELECT 
        player.*,
        nation.image_federation AS nation
      FROM player
      LEFT JOIN nation ON nation.id = player.nation_id
      WHERE player.id = ?
    `);

    return databaseStatement.get(playerId);
  }

  static insertPlayer = async (player: Player) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      INSERT INTO player (
        first_name, last_name, birth_date, position, market_value, current_ability, 
        potential_ability, overall, finishing, crossing, dribbling, heading, 
        tackling, marking, passing, free_kick, acceleration, agility, 
        strength, jumping, vision, decision, positioning, antecipation, 
        aggression, reflexes, handling, diving, nation_id, fatigue
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);

    const insertPlayerResult = databaseStatement.run(
      player.first_name, player.last_name, player.birth_date, player.position, player.market_value, player.current_ability,
      player.potential_ability, player.overall, player.finishing, player.crossing, player.dribbling, player.heading,
      player.tackling, player.marking, player.passing, player.free_kick, player.acceleration, player.agility,
      player.strength, player.jumping, player.vision, player.decision, player.positioning, player.antecipation,
      player.aggression, player.reflexes, player.handling, player.diving, player.nation_id, 0
    );
    return insertPlayerResult;
  };

  static insertContract = async (playerContract: PlayerContract) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      INSERT INTO player_contract (salary, start_date, end_date, player_id, club_id) 
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertContractResult = databaseStatement.run(playerContract.salary, playerContract.start_date, playerContract.end_date, playerContract.player_id, playerContract.club_id);
    return insertContractResult;
  }
}

export default PlayerModel;