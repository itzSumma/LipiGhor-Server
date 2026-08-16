import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

// Register connection event listeners
mongoose.connection.on('connected', () => {
  logger.info('🔌 MongoDB connected successfully');
});

mongoose.connection.on('error', (err: Error) => {
  logger.error(`❌ MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('🔌 MongoDB connection disconnected');
});

/**
 * Establishes a connection to the MongoDB database.
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      logger.info('🔌 MongoDB connection is already established.');
      return;
    }
    await mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    logger.error('❌ Failed to establish MongoDB connection:');
    logger.error(error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};

/**
 * Safely disconnects the MongoDB client.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      logger.info('🔌 MongoDB disconnected successfully');
    }
  } catch (error) {
    logger.error('❌ Error during MongoDB disconnection:');
    logger.error(error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
};
