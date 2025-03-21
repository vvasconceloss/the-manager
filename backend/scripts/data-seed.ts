import logger from "../src/config/logger"
import ClubService from "../src/services/club.service";
import insertImagesAutomatically from "./set-logo-images";

const executeDataSeed = async () => {
  try {
    const startTime = performance.now();

    await Promise.all([
      ClubService.insertFinance("England"),
      ClubService.insertPlayers("England"),
      insertImagesAutomatically().then(() => {}),
    ]);

    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2);

    logger.info(`Database successfully populated in ${executionTime} ms`);
  } catch (error) {
    logger.error(`${error}`);
  }
}

executeDataSeed();