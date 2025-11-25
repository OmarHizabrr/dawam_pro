import { firestoreRepository } from '../lib/FirestoreRepository';
import { Leave } from '../types/models';
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';

export class LeaveRepository {
  private readonly collectionName = 'leaves';

  async create(leave: Omit<Leave, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, leave);
    return id;
  }

  async getById(id: string): Promise<Leave | null> {
    return firestoreRepository.getDocument<Leave>(this.collectionName, id);
  }

  /**
   * الحصول على الإجازة الفعّالة في تاريخ معين
   */
  async getActiveLeave(employeeId: string, date: string): Promise<Leave | null> {
    const targetDate = parseISO(date);
    const leaves = await firestoreRepository.getDocuments<Leave>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );

    for (const leave of leaves) {
      const startDate = parseISO(leave.start_date);
      const endDate = parseISO(leave.end_date);

      if (
        (isEqual(targetDate, startDate) || isAfter(targetDate, startDate)) &&
        (isEqual(targetDate, endDate) || isBefore(targetDate, endDate))
      ) {
        return leave;
      }
    }

    return null;
  }

  async getAllByEmployee(employeeId: string): Promise<Leave[]> {
    return firestoreRepository.getDocuments<Leave>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );
  }

  async update(id: string, data: Partial<Omit<Leave, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const leaveRepository = new LeaveRepository();

