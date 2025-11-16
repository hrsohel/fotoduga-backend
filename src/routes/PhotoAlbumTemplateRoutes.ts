import { Router } from 'express';
import PhotoAlbumTemplateController from '../controllers/PhotoAlbumTemplateController';
import upload from '../middleware/upload';

const router = Router();

router.post('/templates', PhotoAlbumTemplateController.addTemplate);
router.patch(
  '/templates/:templateName/pages',
  upload.array('placedImages'),
  PhotoAlbumTemplateController.updatePagesInTemplate
);
router.get(
  '/templates/:templateName/pages',
  PhotoAlbumTemplateController.getTemplatePages
);

export default router;
