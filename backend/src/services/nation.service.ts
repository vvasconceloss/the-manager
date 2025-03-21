import NationModel from "../models/nation.model";

class NationService {
  private static youthRating: Record<string, number> = {};
  
  static async getAllNationInformation() { return await NationModel.fetchAll(); }

  static async getNationInformation(nation: string) { return await NationModel.fetchInformation(nation); }

  static async getNationsYouthRating(): Promise<Record<string, number>> {
    const nations = await NationModel.fetchAll();
    for (const nation of nations) this.youthRating[nation.name] = nation.youth_rating;

    return this.youthRating;
  }
}

export default NationService;