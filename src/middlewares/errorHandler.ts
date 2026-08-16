import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { AppError } from '../errors/AppError';
import { handleZodError } from '../errors/handleZodError';
import { handleCastError } from '../errors/handleCastError';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { IGenericErrorMessage } from '../types';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // Log the error
  logger.error(err);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: env.NODE_ENV !== 'production' ? err?.stack : undefined,
  });
};
