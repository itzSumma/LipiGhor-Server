export interface IGenericErrorMessage {
  path: string | number;
  message: string;
}

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
  stack?: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginationOptions {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

