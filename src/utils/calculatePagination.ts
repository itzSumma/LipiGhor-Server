import { IPaginationOptions, IPaginationResult } from '../types';

export const calculatePagination = (options: IPaginationOptions): IPaginationResult => {
  const page =
    options.page !== undefined && !isNaN(Number(options.page))
      ? Math.max(1, Number(options.page))
      : 1;
  const limit =
    options.limit !== undefined && !isNaN(Number(options.limit))
      ? Math.max(1, Number(options.limit))
      : 10;
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder === 'asc' ? 'asc' : 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
