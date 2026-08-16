import { IGenericErrorResponse } from '../types';

export const handleDuplicateError = (error: any): IGenericErrorResponse => {
  const keyValue = error.keyValue || {};
  const errorMessages = Object.keys(keyValue).map((key) => {
    return {
      path: key,
      message: `${key} already exists`,
    };
  });

  // Fallback if keyValue is empty but there's a message
  if (errorMessages.length === 0 && error.message) {
    const match = error.message.match(/dup key: \{ (.+?) \}/);
    const field = match ? match[1] : 'field';
    errorMessages.push({
      path: field,
      message: `${field} already exists`,
    });
  }

  return {
    statusCode: 409,
    message: 'Duplicate Entry Error',
    errorMessages,
  };
};
