import { Router } from 'express';
import * as GiftProjectController from '../controllers/GiftProjectController';

const router = Router();

router.post('/gift-projects', GiftProjectController.createGiftProject);
router.get('/gift-projects', GiftProjectController.getGiftProjects);
router.get('/gift-projects/:id', GiftProjectController.getGiftProjectById);
router.put('/gift-projects/:id', GiftProjectController.updateGiftProject);
router.delete('/gift-projects/:id', GiftProjectController.deleteGiftProject);

export default router;