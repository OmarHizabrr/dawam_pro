import { Router } from 'express';
import { leaveController } from '../controllers/LeaveController';

const router = Router();

// Leaves
router.post('/', (req, res) => leaveController.create(req, res));
router.get('/employee/:employeeId', (req, res) => leaveController.getByEmployee(req, res));
router.get('/:id', (req, res) => leaveController.getById(req, res));
router.put('/:id', (req, res) => leaveController.update(req, res));
router.delete('/:id', (req, res) => leaveController.delete(req, res));

// Leave Balances
router.get('/balances/:employeeId', (req, res) => leaveController.getBalances(req, res));
router.post('/balances', (req, res) => leaveController.setBalance(req, res));
router.put('/balances/:employeeId/:leaveType/active', (req, res) => leaveController.setBalanceActive(req, res));

export default router;

