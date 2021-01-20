/* eslint-disable import/no-mutable-exports */
import "core-js/stable";
import "regenerator-runtime/runtime";
import mongoose from "mongoose";
import app from "./app";
import logger from "./config/logger.config";
import config from "./config/config";

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => {
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info("Connected to MongoDB");
    logger.info(`Listening to port ${PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

export default server;
