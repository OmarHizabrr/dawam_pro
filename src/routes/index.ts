import { Router } from 'express';
import employeesRouter from './employees';
import attendanceRouter from './attendance';
import payrollRouter from './payroll';
import schedulesRouter from './schedules';
import leavesRouter from './leaves';

const router = Router();

const apiPrefix = process.env.API_PREFIX || '/api/v1';

router.use(`${apiPrefix}/employees`, employeesRouter);
router.use(`${apiPrefix}/attendance`, attendanceRouter);
router.use(`${apiPrefix}/payroll`, payrollRouter);
router.use(`${apiPrefix}/schedules`, schedulesRouter);
router.use(`${apiPrefix}/leaves`, leavesRouter);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;

