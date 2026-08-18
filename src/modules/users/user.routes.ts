import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

// Endpoint to retrieve authenticated user profile
router.get('/me', authenticate, UserController.getMe);

// Test endpoint for role-based access control verification (only in test environment)
if (process.env.NODE_ENV === 'test') {
  router.get('/test-admin', authenticate, authorize('ADMIN'), (req, res) => {
    res.status(200).json({ success: true, message: 'Admin content' });
  });
}

export const UserRoutes = router;
