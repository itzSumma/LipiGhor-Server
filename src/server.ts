import http from 'http';
import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './config/database';

let server: http.Server;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB database
    await connectDatabase();

    // 2. Start HTTP server listening
    server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start server:');
    logger.error(err instanceof Error ? err : new Error(String(err)));
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('CRITICAL: Uncaught Exception detected!');
  logger.error(err);
  logger.info('Shutting down server...');
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('CRITICAL: Unhandled Rejection detected!');
  logger.error(reason instanceof Error ? reason : new Error(String(reason)));
  logger.info('Shutting down server...');
  process.exit(1);
});

// Handle graceful shutdown on SIGTERM/SIGINT
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down server gracefully...`);

  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      try {
        await disconnectDatabase();
        logger.info('Graceful shutdown completed successfully.');
        process.exit(0);
      } catch (err) {
        logger.error('Error during graceful shutdown:');
        logger.error(err instanceof Error ? err : new Error(String(err)));
        process.exit(1);
      }
    });
  } else {
    try {
      await disconnectDatabase();
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
