import { Request, Response } from 'express';
import { employeeRepository } from '../repositories/EmployeeRepository';
import { Employee } from '../types/models';

export class EmployeeController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const employeeData = req.body as Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;
      const id = await employeeRepository.create(employeeData);
      res.status(201).json({ id, ...employeeData });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const employee = await employeeRepository.getById(id);
      
      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { active } = req.query;
      
      const employees = active === 'true' 
        ? await employeeRepository.getActive()
        : await employeeRepository.getAll();
      
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body as Partial<Omit<Employee, 'id' | 'createdAt'>>;
      
      await employeeRepository.update(id, updateData);
      const updated = await employeeRepository.getById(id);
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await employeeRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export const employeeController = new EmployeeController();

