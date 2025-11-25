import { firestoreRepository } from '../lib/FirestoreRepository';
import { PayrollProfile } from '../types/models';
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';

export class PayrollRepository {
  private readonly collectionName = 'payroll_profiles';

  async create(profile: Omit<PayrollProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, profile);
    return id;
  }

  async getById(id: string): Promise<PayrollProfile | null> {
    return firestoreRepository.getDocument<PayrollProfile>(this.collectionName, id);
  }

  /**
   * الحصول على ملف الراتب الفعّال في تاريخ معين
   */
  async getActiveProfile(employeeId: string, date: string): Promise<PayrollProfile | null> {
    const targetDate = parseISO(date);
    const profiles = await firestoreRepository.getDocuments<PayrollProfile>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );

    for (const profile of profiles) {
      const startDate = parseISO(profile.start_date);
      const endDate = profile.end_date ? parseISO(profile.end_date) : null;

      if (
        (isEqual(targetDate, startDate) || isAfter(targetDate, startDate)) &&
        (endDate === null || isEqual(targetDate, endDate) || isBefore(targetDate, endDate))
      ) {
        return profile;
      }
    }

    return null;
  }

  async getAllByEmployee(employeeId: string): Promise<PayrollProfile[]> {
    return firestoreRepository.getDocuments<PayrollProfile>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );
  }

  async update(id: string, data: Partial<Omit<PayrollProfile, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const payrollRepository = new PayrollRepository();

