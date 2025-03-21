import type { Nation } from "../types/nation";
import connectDatabase from "../config/database";

class NationModel {
  static fetchAll = async (): Promise<Nation[]> => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare(`SELECT * FROM nation`);

    return databaseStatement.all() as Nation[];
  }

  static fetchInformation = async (nation: string) => {
    const databaseInstance = await connectDatabase();
    const databaseStatement = databaseInstance.prepare("SELECT * FROM nation WHERE nation.name = ?");

    return databaseStatement.get(nation) as Nation;
  }
}

export default NationModel;