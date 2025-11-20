import { Router } from 'express';
import * as UserImagesController from '../controllers/UserImagesController';
import { authMiddleware } from '../middleware/auth';
import upload from '../middleware/upload';

const router = Router();

router.post(
  '/images',
  authMiddleware,
  upload.array('images'),
  UserImagesController.uploadImages
);
router.delete('/images', authMiddleware, UserImagesController.deleteImage);
router.get('/images', authMiddleware, UserImagesController.getImagesByUser);

export default router;