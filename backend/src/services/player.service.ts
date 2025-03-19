import NationService from "./nation.service";
import attributesRange from "../data/attributes-range";

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
}

export default PlayerService;