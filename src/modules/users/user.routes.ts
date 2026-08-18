import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

// Endpoint to retrieve authenticated user profile
router.get('/me', authenticate, UserController.getMe);

export const UserRoutes = router;
