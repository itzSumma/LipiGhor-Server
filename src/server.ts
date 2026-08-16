import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

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
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down server gracefully...`);
  server.close(() => {
    logger.info('HTTP server closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
