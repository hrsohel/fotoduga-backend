import { Router } from 'express';
import UserImagesController from '../controllers/UserImagesController';
import upload from '../middleware/upload';

const router = Router();

router.post(
  '/users/:userId/images',
  upload.array('images'),
  UserImagesController.uploadImages
);
router.delete('/users/:userId/images', UserImagesController.deleteImage);
router.get('/users/:userId/images', UserImagesController.getImagesByUser);

export default router;
