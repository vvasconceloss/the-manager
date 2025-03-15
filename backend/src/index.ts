import fastify from "./fastify";
import logger from "./config/logger";
import connectDatabase from "./config/database";

const startServer = async () => {  
  try {
    await connectDatabase();

    fastify.listen({ port: 3000 }, (error, address) => {
      if (error) {
        logger.error(`fastify failed to start: ${error}`);
        process.exit(1);
      }

      logger.info(`Server listening at ${address}`);
    });
  } catch (error: unknown ) {
    logger.error(`server startup failed: ${error}`);
    process.exit(1);
  }
}

startServer();