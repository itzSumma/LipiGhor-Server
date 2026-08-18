import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserServices } from './user.service';

/**
 * Controller to get the currently logged-in user profile.
 */
const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await UserServices.getUserProfileFromDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const UserController = {
  getMe,
};
