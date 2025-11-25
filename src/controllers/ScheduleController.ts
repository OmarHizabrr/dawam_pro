import { Request, Response } from 'express';
import { scheduleRepository } from '../repositories/ScheduleRepository';
import { EmployeeSchedule } from '../types/models';

export class ScheduleController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const scheduleData = req.body as Omit<EmployeeSchedule, 'id' | 'createdAt' | 'updatedAt'>;
      const id = await scheduleRepository.create(scheduleData);
      res.status(201).json({ id, ...scheduleData });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const schedule = await scheduleRepository.getById(id);
      
      if (!schedule) {
        res.status(404).json({ error: 'Schedule not found' });
        return;
      }
      
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getByEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const schedules = await scheduleRepository.getAllByEmployee(employeeId);
      res.json(schedules);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getActive(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const { date } = req.query;
      
      if (!date || typeof date !== 'string') {
        res.status(400).json({ error: 'date parameter is required' });
        return;
      }

      const schedule = await scheduleRepository.getActiveSchedule(employeeId, date);
      
      if (!schedule) {
        res.status(404).json({ error: 'No active schedule found' });
        return;
      }
      
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body as Partial<Omit<EmployeeSchedule, 'id' | 'createdAt'>>;
      
      await scheduleRepository.update(id, updateData);
      const updated = await scheduleRepository.getById(id);
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await scheduleRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export const scheduleController = new ScheduleController();

