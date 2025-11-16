import { Router } from 'express';
import PhotoAlbumStateController from '../controllers/PhotoAlbumStateController';
import upload from '../middleware/upload';

const router = Router();

router.post(
  '/states',
  upload.array('placedImages'),
  PhotoAlbumStateController.createState
);

export default router;
