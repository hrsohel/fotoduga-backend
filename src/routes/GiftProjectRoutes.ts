import { Router } from 'express';
import GiftProjectController from '../controllers/GiftProjectController';
import upload from '../middleware/upload';

const router = Router();

router.post(
  '/projects',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'templateImage', maxCount: 1 },
  ]),
  GiftProjectController.createProject
);
router.put(
  '/projects/:projectId',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'templateImage', maxCount: 1 },
  ]),
  GiftProjectController.updateProject
);
router.get('/projects/:projectId', GiftProjectController.getProjectById);
router.get('/users/:userId/projects', GiftProjectController.getProjectsByUser);

export default router;
