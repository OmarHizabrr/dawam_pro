import { Router } from 'express';
import { employeeController } from '../controllers/EmployeeController';

const router = Router();

router.post('/', (req, res) => employeeController.create(req, res));
router.get('/', (req, res) => employeeController.getAll(req, res));
router.get('/:id', (req, res) => employeeController.getById(req, res));
router.put('/:id', (req, res) => employeeController.update(req, res));
router.delete('/:id', (req, res) => employeeController.delete(req, res));

export default router;

