export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly metadata?: unknown;

  constructor(statusCode: number, message: string, metadata?: unknown, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.metadata = metadata;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
