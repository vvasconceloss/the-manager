import attributesRange from "../data/attributes-range";

type Position = keyof typeof attributesRange;

class PlayerService {
  static generateAttributeValue(attributeWeigth: number) {
    const minimumAttribute = Math.max(1, Math.round((attributeWeigth / 10) * 15));
    const maximumAttribute = Math.min(20, minimumAttribute + 5);

    return Math.floor(Math.random() * (maximumAttribute - minimumAttribute + 1)) + minimumAttribute;
  }

  static async generateAttributes(position: Position) {
    const playerAttribute: Record<string, number> = {};

    for (const attribute in attributesRange[position]) {
      const attributeKey = attribute as keyof typeof attributesRange[Position];
      playerAttribute[attribute] = this.generateAttributeValue(attributesRange[position][attributeKey]);
    }

    return playerAttribute;
  }
}

export default PlayerService;