import { Router } from 'express';
import { scheduleController } from '../controllers/ScheduleController';

const router = Router();

router.post('/', (req, res) => scheduleController.create(req, res));
router.get('/employee/:employeeId', (req, res) => scheduleController.getByEmployee(req, res));
router.get('/employee/:employeeId/active', (req, res) => scheduleController.getActive(req, res));
router.get('/:id', (req, res) => scheduleController.getById(req, res));
router.put('/:id', (req, res) => scheduleController.update(req, res));
router.delete('/:id', (req, res) => scheduleController.delete(req, res));

export default router;

