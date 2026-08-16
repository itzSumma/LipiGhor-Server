import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  logger.error(err);

  const statusCode = 500;
  res.status(statusCode).json({
    success: false,
    message: env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    stack: env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
