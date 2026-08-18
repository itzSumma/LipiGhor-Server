import { AppError } from '../../errors/AppError';
import { User } from './user.model';
import { IUser } from './user.interface';

/**
 * Retrieves the user profile from the database by user ID.
 */
const getUserProfileFromDB = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User profile not found');
  }
  return user;
};

export const UserServices = {
  getUserProfileFromDB,
};
