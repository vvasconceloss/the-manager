import ClubModel from "../models/club.model";
import type { ClubFinance } from "../types/club";

class ClubService {
  static async generateFinance(clubId: number) {
    let minimumBalance, maximumBalance;
    const clubInformation = await ClubModel.fetchInformation(clubId) as { id: number, reputation: number };

    if (clubInformation.reputation >= 900) {
        minimumBalance = 200000000;
        maximumBalance = 600000000;
    } else if (clubInformation.reputation >= 750) {
        minimumBalance = 100000000;
        maximumBalance = 300000000;
    } else if (clubInformation.reputation >= 600) {
        minimumBalance = 50000000;
        maximumBalance = 100000000;
    } else if (clubInformation.reputation >= 400) {
        minimumBalance = 10000000;
        maximumBalance = 20000000;
    } else {
        minimumBalance = 100000;
        maximumBalance = 1000000;
    }

    const clubBalance = Math.floor(minimumBalance + Math.random() * (maximumBalance - minimumBalance));
    const clubBudget = Math.floor(clubBalance * (0.1 + Math.random() * 0.15));
    const clubSalaries = Math.floor(clubBalance * (0.03 + Math.random() * 0.07));

    const clubFinance: ClubFinance = { club_id: clubInformation.id, balance: clubBalance, budget: clubBudget, salaries: clubSalaries };
    ClubModel.updateFinance(clubFinance);
  }
}

export default ClubService;