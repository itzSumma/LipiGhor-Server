import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../config/auth';
import { AppError } from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import { UserRole } from '../modules/users/user.interface';

/**
 * Middleware to authenticate requests using Better Auth sessions or JWTs.
 * Checks cookies and Authorization: Bearer <token> headers automatically.
 */
export const authenticate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    throw new AppError(401, 'Unauthorized: Invalid or expired session/token');
  }

  req.session = session.session;
  req.user = session.user;

  next();
});

/**
 * Middleware to restrict access based on user roles.
 * Must be placed after the authenticate middleware.
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized: User not authenticated');
    }

    const userRole = req.user.role as UserRole;

    if (!roles.includes(userRole)) {
      throw new AppError(403, 'Forbidden: You do not have permission to perform this action');
    }

    next();
  };
};
