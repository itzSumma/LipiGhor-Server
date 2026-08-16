import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../types';

export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorMessages = error.issues.map((issue) => {
    return {
      path: issue.path.join('.'),
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };
};
