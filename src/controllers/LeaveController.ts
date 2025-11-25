import { Request, Response } from 'express';
import { leaveRepository } from '../repositories/LeaveRepository';
import { leaveBalanceRepository } from '../repositories/LeaveBalanceRepository';
import { Leave, LeaveBalance } from '../types/models';

export class LeaveController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const leaveData = req.body as Omit<Leave, 'id' | 'createdAt' | 'updatedAt'>;
      const id = await leaveRepository.create(leaveData);
      res.status(201).json({ id, ...leaveData });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const leave = await leaveRepository.getById(id);
      
      if (!leave) {
        res.status(404).json({ error: 'Leave not found' });
        return;
      }
      
      res.json(leave);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getByEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const leaves = await leaveRepository.getAllByEmployee(employeeId);
      res.json(leaves);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body as Partial<Omit<Leave, 'id' | 'createdAt'>>;
      
      await leaveRepository.update(id, updateData);
      const updated = await leaveRepository.getById(id);
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await leaveRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Leave Balance endpoints
  async getBalances(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const balances = await leaveBalanceRepository.getAllBalances(employeeId);
      res.json(balances);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async setBalance(req: Request, res: Response): Promise<void> {
    try {
      const balanceData = req.body as Omit<LeaveBalance, 'createdAt' | 'updatedAt'>;
      await leaveBalanceRepository.setBalance(balanceData);
      res.status(201).json(balanceData);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async setBalanceActive(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId, leaveType } = req.params;
      const { isActive } = req.body;
      
      await leaveBalanceRepository.setActive(employeeId, leaveType as any, isActive);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export const leaveController = new LeaveController();

