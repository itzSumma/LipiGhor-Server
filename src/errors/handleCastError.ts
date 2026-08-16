import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../types';

export const handleCastError = (error: mongoose.Error.CastError): IGenericErrorResponse => {
  const errorMessages = [
    {
      path: error.path,
      message: `Invalid value for ${error.path}`,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid ID',
    errorMessages,
  };
};
