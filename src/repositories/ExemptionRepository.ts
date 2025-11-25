import { firestoreRepository } from '../lib/FirestoreRepository';
import { Exemption } from '../types/models';
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';

export class ExemptionRepository {
  private readonly collectionName = 'exemptions';

  async create(exemption: Omit<Exemption, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, exemption);
    return id;
  }

  async getById(id: string): Promise<Exemption | null> {
    return firestoreRepository.getDocument<Exemption>(this.collectionName, id);
  }

  /**
   * الحصول على الإعفاء الفعّال في تاريخ معين
   */
  async getActiveExemption(employeeId: string, date: string): Promise<Exemption | null> {
    const targetDate = parseISO(date);
    const exemptions = await firestoreRepository.getDocuments<Exemption>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );

    for (const exemption of exemptions) {
      const startDate = parseISO(exemption.start_date);
      const endDate = parseISO(exemption.end_date);

      if (
        (isEqual(targetDate, startDate) || isAfter(targetDate, startDate)) &&
        (isEqual(targetDate, endDate) || isBefore(targetDate, endDate))
      ) {
        return exemption;
      }
    }

    return null;
  }

  async getAllByEmployee(employeeId: string): Promise<Exemption[]> {
    return firestoreRepository.getDocuments<Exemption>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );
  }

  async update(id: string, data: Partial<Omit<Exemption, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const exemptionRepository = new ExemptionRepository();

