import ClubModel from "../models/club.model";
import NationService from "./nation.service";
import { Faker, faker } from "@faker-js/faker";
import PlayerModel from "../models/player.model";
import fakerLocales from "../data/faker-locations";
import attributesRange from "../data/attributes-range";
import type { Player, PlayerContract } from "../types/player";

type Position = keyof typeof attributesRange;

class PlayerService {
  private static generateRandomValue(minValue: number, maxValue: number): number { return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue; }

  static generateAttributeValue(attributeWeight: number): number {
    const minimumAttribute = Math.max(1, Math.round((attributeWeight / 10) * 15));
    const maximumAttribute = Math.min(20, minimumAttribute + 5);

    return Math.floor(Math.random() * (maximumAttribute - minimumAttribute + 1)) + minimumAttribute;
  }

  static generateAttributes(position: Position): Record<string, number> {
    const playerAttributes: Record<string, number> = {};

    for (const attribute in attributesRange[position]) {
      const attributeKey = attribute as keyof typeof attributesRange[Position];
      playerAttributes[attribute] = this.generateAttributeValue(attributesRange[position][attributeKey]);
    }

    return playerAttributes;
  }

  static generateCurrentAbility(playerAttributes: Record<string, number>, position: Position): number {
    let weightedSum = 0;
    const positionWeights = attributesRange[position];

    for (const attribute in playerAttributes) {
      const attributeWeight = positionWeights[attribute as keyof typeof positionWeights];
      weightedSum += playerAttributes[attribute] * attributeWeight;
    }

    const maximumCurrentAbility = 20 * Object.values(positionWeights).reduce((sum, weight) => sum + weight, 0);
    const currentAbility = Math.round((weightedSum / maximumCurrentAbility) * 250);

    return Math.min(Math.max(currentAbility, 1), 200);
  }

  static generateOverall(currentAbility: number): number {
    const baseValue = 100;
    const exponent = 0.75;

    return Math.round(baseValue * Math.pow(currentAbility / 200, exponent));
  }

  static generateInformation(fakerInstance: Faker) {
    const firstName = fakerInstance.person.firstName("male");
    const lastName = fakerInstance.person.lastName("male");
    const birthDate = fakerInstance.date.birthdate({ mode: 'age', min: 16, max: 40 });
    const marketValue = Math.round(parseFloat((Math.random() * 100000000).toFixed(2)));

    return { firstName, lastName, birthDate, marketValue }
  }

  static async generatePotentialAbility(nation: string): Promise<{ potentialAbility: number }> {
    const nationsYouthRating = await NationService.getNationsYouthRating();
    const youthRating = nationsYouthRating[nation] || 50;

    let basePotentialAbility = Math.floor(youthRating + (Math.random() * 40 - 20));
    let potentialAbility: number;

    const chanceToBeWonderkid = youthRating / 2;
    if (Math.random() * 100 < chanceToBeWonderkid) {
      potentialAbility = this.generateRandomValue(160, 200);
    } else {
      const minimumPotentialAbility = Math.max(50, basePotentialAbility - 30);
      const maximumPotentialAbility = Math.min(180, basePotentialAbility + 30);
      potentialAbility = this.generateRandomValue(minimumPotentialAbility, maximumPotentialAbility);
    }

    if (Math.random() < 0.02) { potentialAbility = this.generateRandomValue(180, 200); }

    return { potentialAbility };
  }

  static async generatePlayerData(nation: string, nation_id: number, position: Position) {
    const getFakerByNation = (nation: string) => { return fakerLocales[nation] || faker };
    const capitalize = (name: string) => { return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()).join(' ');}

    const fakerInstance = getFakerByNation(nation);
    const { firstName, lastName, birthDate, marketValue } = this.generateInformation(fakerInstance);

    const firstNameCapitalized = capitalize(firstName);
    const lastNameCapitalized = capitalize(lastName);

    const formattedBirthDate = new Date(birthDate).toISOString().split('T')[0];

    const attributes = this.generateAttributes(position);
    const currentAbility = this.generateCurrentAbility(attributes, position);
    const overall = this.generateOverall(currentAbility);
    const potentialAbility = (await this.generatePotentialAbility(nation)).potentialAbility;

    const player: Player = {
      first_name: firstNameCapitalized, last_name: lastNameCapitalized, birth_date: formattedBirthDate, 
      position: position, market_value: marketValue, current_ability: currentAbility, potential_ability: potentialAbility,
      overall: overall, finishing: attributes.finishing, crossing: attributes.crossing, dribbling: attributes.dribbling,
      heading: attributes.heading, tackling: attributes.tackling, marking: attributes.marking,
      passing: attributes.passing, free_kick: attributes.free_kick, acceleration: attributes.acceleration,
      agility: attributes.agility, strength: attributes.strength, jumping: attributes.jumping,
      vision: attributes.vision, decision: attributes.decision, positioning: attributes.positioning,
      antecipation: attributes.antecipation, aggression: attributes.aggression, reflexes: attributes.reflexes, 
      handling: attributes.handling, diving: attributes.diving, nation_id: nation_id
    }

    const playerId = (await PlayerModel.insertPlayer(player)).lastInsertRowid as number;
  }

  static async generatePlayerContract(clubId: number, playerId: number) {
    const playerInformation = await PlayerModel.fetchInformation(playerId) as Player;
    const clubInformation = await ClubModel.fetchInformation(clubId) as { id: number, reputation: number, salaries: number };

    const salaryBudget = clubInformation.salaries;

    let baseSalary;
    if (clubInformation.reputation >= 800) baseSalary = Math.min(100_000, salaryBudget * 0.2);
    else if (clubInformation.reputation >= 600) baseSalary = Math.min(50_000, salaryBudget * 0.15);
    else if (clubInformation.reputation >= 400) baseSalary = Math.min(20_000, salaryBudget * 0.1);
    else if (clubInformation.reputation >= 200) baseSalary = Math.min(10_000, salaryBudget * 0.05);
    else baseSalary = Math.min(3_000, salaryBudget * 0.02);

    const randomFactor = 0.8 + Math.random() * 0.4;
    const playerSalary = baseSalary * (1 + playerInformation.current_ability / 150) * randomFactor;

    const weeklySalary = Math.round(playerSalary / 4);
    const contractDurationYears = Math.max(1, Math.min(5, Math.floor((playerInformation.current_ability / 20) + (clubInformation.reputation / 250))));

    const startDate = new Date(2023, 6, 1);
    const maximumStartDate = new Date(2025, 4, 31);
    const randomTimeOffset = Math.random() * (maximumStartDate.getTime() - startDate.getTime());
    const contractStartDate = new Date(startDate.getTime() + randomTimeOffset);

    const contractEndDate = new Date(contractStartDate);
    contractEndDate.setFullYear(contractEndDate.getFullYear() + contractDurationYears);

    const playerContract: PlayerContract = { 
      salary: weeklySalary, start_date: contractStartDate.toISOString().split("T")[0],
      end_date: contractEndDate.toISOString().split("T")[0], club_id: clubInformation.id, player_id: playerId
    };

    return playerContract;
  }
}

export default PlayerService;