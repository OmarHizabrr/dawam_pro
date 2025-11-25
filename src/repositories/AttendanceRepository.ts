import { firestoreRepository } from '../lib/FirestoreRepository';
import { AttendanceLog } from '../types/models';

export class AttendanceRepository {
  private readonly collectionName = 'attendance_logs';

  async create(attendance: Omit<AttendanceLog, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, attendance);
    return id;
  }

  async getById(id: string): Promise<AttendanceLog | null> {
    return firestoreRepository.getDocument<AttendanceLog>(this.collectionName, id);
  }

  /**
   * الحصول على سجل حضور في تاريخ معين
   */
  async getByDate(employeeId: string, date: string): Promise<AttendanceLog | null> {
    const logs = await firestoreRepository.getDocuments<AttendanceLog>(
      this.collectionName,
      [
        { field: 'employee_id', operator: '==', value: employeeId },
        { field: 'date', operator: '==', value: date },
      ],
      1
    );

    return logs.length > 0 ? logs[0] : null;
  }

  async getAllByEmployee(employeeId: string, startDate?: string, endDate?: string): Promise<AttendanceLog[]> {
    const filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: unknown }> = [
      { field: 'employee_id', operator: '==', value: employeeId },
    ];

    if (startDate) {
      filters.push({ field: 'date', operator: '>=', value: startDate });
    }

    if (endDate) {
      filters.push({ field: 'date', operator: '<=', value: endDate });
    }

    return firestoreRepository.getDocuments<AttendanceLog>(this.collectionName, filters);
  }

  async update(id: string, data: Partial<Omit<AttendanceLog, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const attendanceRepository = new AttendanceRepository();

