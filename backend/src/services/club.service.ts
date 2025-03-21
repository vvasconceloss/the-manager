import ClubModel from "../models/club.model";
import PlayerService from "./player.service";
import NationService from "./nation.service";
import type { Nation } from "../types/nation";
import type { ClubFinance } from "../types/club";
import type { Position } from "./player.service";
import positionDistribution from "../data/player-positions";

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

    static async getAllByNation(nationId: number) { return await ClubModel.fetchAllByNation(nationId); }

    static async insertFinance(nation: string) {
        const nationInformation = await NationService.getNationInformation(nation);
        const clubs = await this.getAllByNation(nationInformation.id);

        for (const club of clubs) { this.generateFinance(club.id); }
    }

    static async insertPlayers(nation: string) {
        const nations: Nation[] = await NationService.getAllNationInformation();
        const nationInformation = await NationService.getNationInformation(nation);
        const clubs = await this.getAllByNation(nationInformation.id);

        for (const club of clubs) {
            for (const [position, count] of Object.entries(positionDistribution) as [Position, number][]) {
                for (let counter = 0; counter < count; counter++) {
                    const playerNation = Math.random() < 0.4 ? nation : nations[Math.floor(Math.random() * nations.length)].name;
                    await PlayerService.generatePlayerData(playerNation, club.id, position);
                }
            }
        }
    }
}

export default ClubService;