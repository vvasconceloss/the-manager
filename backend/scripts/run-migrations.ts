import path from "path";
import fs from "fs/promises";
import logger from "../src/config/logger";
import connectDatabase from "../src/config/database";

const runMigrations = async () => {
  const databaseInstance = await connectDatabase();
  
  try {
    const migrationsFolder = path.join(__dirname, "../", "database", "migrations");
    const migrationFiles = (await fs.readdir(migrationsFolder)).sort();

    for (const file of migrationFiles) {
      const migrationFilePath = path.join(migrationsFolder, file);
      const migration = await fs.readFile(migrationFilePath, "utf-8");

      try {
        databaseInstance.exec("BEGIN TRANSACTION");
        databaseInstance.exec(migration);
        databaseInstance.exec("COMMIT");
        logger.info(`${file} was executed`);
      } catch (error) {
        databaseInstance.exec("ROLLBACK");
        logger.error(`${file}: ${error}`);
        throw error;
      }
    }

  } catch (error) {
    logger.error(`${error}`);
    process.exit(1);
  }
}

runMigrations();