// @ts-ignore - date-fns types
import { isAfter, isBefore, isEqual, parseISO } from 'date-fns';
import { firestoreRepository } from '../lib/FirestoreRepository';
import { EmployeeSchedule } from '../types/models';

export class ScheduleRepository {
  private readonly collectionName = 'employee_schedules';

  async create(schedule: Omit<EmployeeSchedule, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, schedule);
    return id;
  }

  async getById(id: string): Promise<EmployeeSchedule | null> {
    return firestoreRepository.getDocument<EmployeeSchedule>(this.collectionName, id);
  }

  /**
   * الحصول على جدول الدوام الفعّال في تاريخ معين
   */
  async getActiveSchedule(employeeId: string, date: string): Promise<EmployeeSchedule | null> {
    const targetDate = parseISO(date);
    const schedules = await firestoreRepository.getDocuments<EmployeeSchedule>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );

    // البحث عن الجدول الفعّال في التاريخ المحدد
    for (const schedule of schedules) {
      const startDate = parseISO(schedule.start_date);
      const endDate = schedule.end_date ? parseISO(schedule.end_date) : null;

      // التحقق من أن التاريخ ضمن النطاق
      if (
        (isEqual(targetDate, startDate) || isAfter(targetDate, startDate)) &&
        (endDate === null || isEqual(targetDate, endDate) || isBefore(targetDate, endDate))
      ) {
        return schedule;
      }
    }

    return null;
  }

  async getAllByEmployee(employeeId: string): Promise<EmployeeSchedule[]> {
    return firestoreRepository.getDocuments<EmployeeSchedule>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );
  }

  async update(id: string, data: Partial<Omit<EmployeeSchedule, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const scheduleRepository = new ScheduleRepository();

