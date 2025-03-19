import attributesRange from "../data/attributes-range";

type Position = keyof typeof attributesRange;

class PlayerService {
  static generateAttributeValue(attributeWeigth: number) {
    const minimumAttribute = Math.max(1, Math.round((attributeWeigth / 10) * 15));
    const maximumAttribute = Math.min(20, minimumAttribute + 5);

    return Math.floor(Math.random() * (maximumAttribute - minimumAttribute + 1)) + minimumAttribute;
  }

  static generateAttributes(position: Position) {
    const playerAttribute: Record<string, number> = {};

    for (const attribute in attributesRange[position]) {
      const attributeKey = attribute as keyof typeof attributesRange[Position];
      playerAttribute[attribute] = this.generateAttributeValue(attributesRange[position][attributeKey]);
    }

    return playerAttribute;
  }

  static generateCurrentAbility(playerAttribute: Record<string, number>, position: Position) {
    let weightedSum: number = 0;
    const positionWeight = attributesRange[position];

    for (const attribute in playerAttribute) {
      const attributeWeight = positionWeight[attribute as keyof typeof positionWeight];
      weightedSum += playerAttribute[attribute] * attributeWeight;
    }

    const maximumCurrentAbility = 20 * Object.values(positionWeight).reduce((sum, weight) => sum + weight, 0);
    const currentAbility = Math.round((weightedSum / maximumCurrentAbility) * 250);
    const clampedCurrentAbility = Math.min(Math.max(currentAbility, 1), 200);

    return clampedCurrentAbility;
  }

  static generateOverall(currentAbility: number) { 
    const baseValue = 100;
    const exponent = 0.75;

    return Math.round(baseValue * Math.pow(currentAbility / 200, exponent));
  }
}

export default PlayerService;