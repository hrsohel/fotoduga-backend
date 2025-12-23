import { Router } from 'express';
import * as UserImagesController from '../controllers/UserImagesController';
import { authMiddleware } from '../middleware/auth';
import upload from '../middleware/upload';

const router = Router();

router.post(
  '/images',
  upload.array('images'),
  UserImagesController.uploadImages
);
router.delete('/images', UserImagesController.deleteImage);
router.get('/images', UserImagesController.getImagesByUser);

export default router;