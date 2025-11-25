import { Request, Response } from 'express';
import { attendanceRepository } from '../repositories/AttendanceRepository';
import { dayEvaluationService } from '../services/DayEvaluationService';
import { AttendanceLog } from '../types/models';

export class AttendanceController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const attendanceData = req.body as Omit<AttendanceLog, 'id' | 'createdAt' | 'updatedAt'>;
      const id = await attendanceRepository.create(attendanceData);
      res.status(201).json({ id, ...attendanceData });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getByDate(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId, date } = req.params;
      const attendance = await attendanceRepository.getByDate(employeeId, date);
      
      if (!attendance) {
        res.status(404).json({ error: 'Attendance not found' });
        return;
      }
      
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async evaluateDay(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId, date } = req.params;
      const evaluation = await dayEvaluationService.evaluateDay(employeeId, date);
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getEmployeeAttendance(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;
      const { startDate, endDate } = req.query;
      
      const attendance = await attendanceRepository.getAllByEmployee(
        employeeId,
        startDate as string,
        endDate as string
      );
      
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export const attendanceController = new AttendanceController();

