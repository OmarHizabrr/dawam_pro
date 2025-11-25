import { Router } from 'express';
import { payrollController } from '../controllers/PayrollController';

const router = Router();

router.get('/calculate/:employeeId', (req, res) => payrollController.calculatePayroll(req, res));
router.get('/cycle/:employeeId', (req, res) => payrollController.calculateByCycle(req, res));

export default router;

