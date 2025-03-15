import os from "os";
import fs from "fs";
import path from "path";
import logger from "./logger";
import Database from "better-sqlite3";

const ensureConfigFolder = (): string => {
  const userConfigPath = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  const databaseFilePath = path.resolve(userConfigPath, "./TheManager/the_manager.db");

  try {
    const databaseFolderPath = path.dirname(databaseFilePath);
    if (!fs.existsSync(databaseFolderPath)) fs.mkdirSync(databaseFolderPath, { recursive: true });
  
    return databaseFilePath;
  } catch (error) {
    logger.error(`${error}`);
    process.exit(1);
  }
}

const connectDatabase = async () => {
  try {
    const database = new Database(ensureConfigFolder());
    return database;
  } catch (error) {
    logger.error(`${error}`);
    process.exit(1);
  }
}

export default connectDatabase;