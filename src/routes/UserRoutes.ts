import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateUser);
router.delete('/profile', authMiddleware, UserController.deleteUser);

export default router;
