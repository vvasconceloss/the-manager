import os from "os";
import fs from "fs";
import path from "path";
import logger from "../src/config/logger";
import connectDatabase from "../src/config/database";

const GRAPHICS_FOLDER_PATH = path.join(os.homedir(), 'Documents', 'ProPlay Studios', "The Manager 2025", "graphics", "logos");

const processClubImages = async (folderPath: string, nationName: string) => {
  const databaseInstance = await connectDatabase();

  const imageFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".png"));

  for (const file of imageFiles) {
    const clubId = parseInt(file.replace(".png", ""), 10);
    if (isNaN(clubId)) continue;

    const filePath = `graphics/logos/${nationName}/${file}`;
    const clubExists = databaseInstance.prepare("SELECT COUNT(*) as count FROM club WHERE id = ?").get(clubId) as { count: number };

    if (clubExists.count > 0) { databaseInstance.prepare("UPDATE club SET image_logo = ? WHERE id = ?").run(filePath, clubId); }
  }
};

const processNationType = async (folderPath: string, columnName: string) => {
  const databaseInstance = await connectDatabase();

  const imageFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".png"));

  for (const file of imageFiles) {
    const nationId = parseInt(file.replace(".png", ""), 10);
    if (isNaN(nationId)) continue;

    const filePath = `graphics/logos/nations/${columnName === "image_federation" ? "federations" : "flags"}/${file}`;
    const nationExists = databaseInstance.prepare("SELECT COUNT(*) as count FROM nation WHERE id = ?").get(nationId) as { count: number };

    if (nationExists.count > 0) { databaseInstance.prepare(`UPDATE nation SET ${columnName} = ? WHERE id = ?`).run(filePath, nationId); }
  }
};

const processNationImages = async (nationsPath: string) => {
  const flagsPath = path.join(nationsPath, "flags");
  const federationPath = path.join(nationsPath, "federations");

  if (fs.existsSync(federationPath)) { await processNationType(federationPath, "image_federation"); }

  if (fs.existsSync(flagsPath)) { await processNationType(flagsPath, "image_flag"); }
};

const insertImagesAutomatically = async () => {
  try {
    const directories = fs.readdirSync(GRAPHICS_FOLDER_PATH, { withFileTypes: true });

    for (const dir of directories) {
      logger.info(dir)
      
      if (dir.isDirectory()) {
        const folderPath = path.join(GRAPHICS_FOLDER_PATH, dir.name);
  
        if (dir.name === "nations") {
          await processNationImages(folderPath);
        } else {
          await processClubImages(folderPath, dir.name);
        }
      }
    }
  } catch (error) {
    logger.error(`${error}`);
    process.exit(1);
  }
};

insertImagesAutomatically().then(() => { logger.info(`Inserting finished images`) });