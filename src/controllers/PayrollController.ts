import { Request, Response } from 'express';
import { payrollService } from '../services/PayrollService';
import { PaymentCycle } from '../types/models';

export class PayrollController {
  async calculatePayroll(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const { periodStart, periodEnd } = req.query;

      if (!periodStart || !periodEnd) {
        res.status(400).json({ error: 'periodStart and periodEnd are required' });
        return;
      }

      const calculation = await payrollService.calculatePayroll(
        employeeId,
        periodStart as string,
        periodEnd as string
      );

      res.json(calculation);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async calculateByCycle(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const { cycle, referenceDate } = req.query;

      if (!cycle) {
        res.status(400).json({ error: 'cycle is required' });
        return;
      }

      const calculation = await payrollService.calculatePayrollByCycle(
        employeeId,
        cycle as PaymentCycle,
        referenceDate as string
      );

      res.json(calculation);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export const payrollController = new PayrollController();

