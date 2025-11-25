import { Router } from 'express';
import { attendanceController } from '../controllers/AttendanceController';

const router = Router();

router.post('/', (req, res) => attendanceController.create(req, res));
router.get('/employee/:employeeId', (req, res) => attendanceController.getEmployeeAttendance(req, res));
router.get('/employee/:employeeId/date/:date', (req, res) => attendanceController.getByDate(req, res));
router.get('/evaluate/:employeeId/:date', (req, res) => attendanceController.evaluateDay(req, res));

export default router;

