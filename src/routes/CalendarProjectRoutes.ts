import { Router } from 'express';
import * as CalendarProjectController from '../controllers/CalendarProjectController';

const router = Router();

router.post('/calendar-projects', CalendarProjectController.createCalendarProject);
router.get('/calendar-projects', CalendarProjectController.getCalendarProjects);
router.get('/calendar-projects/:id', CalendarProjectController.getCalendarProjectById);
router.put('/calendar-projects/:id', CalendarProjectController.updateCalendarProject);
router.delete('/calendar-projects/:id', CalendarProjectController.deleteCalendarProject);

export default router;