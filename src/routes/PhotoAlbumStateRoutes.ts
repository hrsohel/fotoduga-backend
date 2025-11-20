import { Router } from 'express';
import * as PhotoAlbumStateController from '../controllers/PhotoAlbumStateController';

const router = Router();

router.post('/photo-album-states', PhotoAlbumStateController.createPhotoAlbumState);
router.get('/photo-album-states', PhotoAlbumStateController.getPhotoAlbumStates);
router.get('/photo-album-states/:id', PhotoAlbumStateController.getPhotoAlbumStateById);
router.put('/photo-album-states/:id', PhotoAlbumStateController.updatePhotoAlbumState);
router.delete('/photo-album-states/:id', PhotoAlbumStateController.deletePhotoAlbumState);

export default router;