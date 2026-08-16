import { Response } from 'express';
import { IMeta } from '../types';

interface IResponseData<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: IMeta;
  data?: T | null;
}

export const sendResponse = <T>(res: Response, responseData: IResponseData<T>): void => {
  res.status(responseData.statusCode).json({
    success: responseData.success,
    statusCode: responseData.statusCode,
    message: responseData.message || null,
    meta: responseData.meta || undefined,
    data: responseData.data !== undefined ? responseData.data : null,
  });
};
