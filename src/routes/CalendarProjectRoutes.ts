import { Router } from 'express';
import CalendarProjectController from '../controllers/CalendarProjectController';

const router = Router();

router.post('/projects', CalendarProjectController.createProject);
router.post('/projects/:projectId/pages', CalendarProjectController.addOrUpdatePage);
router.get('/projects/:projectId/pages', CalendarProjectController.getProjectPages);

export default router;
