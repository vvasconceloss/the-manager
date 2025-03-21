import connectDatabase from "../config/database";
import type { ClubFinance } from "../types/club";

class ClubModel {
  static fetchInformation = async (clubId: number) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      SELECT
        club.*,
        nation.image_federation AS federation,
        stadium.name AS stadium,
        coach.id AS coachId,
        CONCAT(coach.first_name, ' ', coach.last_name) AS full_name
      FROM club
      LEFT JOIN nation ON nation.id = club.nation_id
      LEFT JOIN stadium ON stadium.id = club.stadium_id
      LEFT JOIN coach_contract ON coach_contract.club_id = club.id
      LEFT JOIN coach ON coach.id = coach_contract.coach_id
      WHERE club.id = ?
    `);

    return databaseStatement.get(clubId);
  }

  static updateFinance = async (clubFinance: ClubFinance) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`
      UPDATE club 
        SET balance = ?, budget = ?, salaries = ?
        WHERE club.id = ?
    `);

    return databaseStatement.run(clubFinance.balance, clubFinance.budget, clubFinance.salaries, clubFinance.club_id);
  }
}

export default ClubModel;