import { firestoreRepository } from '../lib/FirestoreRepository';
import { DeductionRules } from '../types/models';
import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';

export class DeductionRulesRepository {
  private readonly collectionName = 'deduction_rules';

  async create(rules: Omit<DeductionRules, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, rules);
    return id;
  }

  async getById(id: string): Promise<DeductionRules | null> {
    return firestoreRepository.getDocument<DeductionRules>(this.collectionName, id);
  }

  /**
   * الحصول على قواعد الخصم الفعّالة في تاريخ معين
   */
  async getActiveRules(employeeId: string, date: string): Promise<DeductionRules | null> {
    const targetDate = parseISO(date);
    const rulesList = await firestoreRepository.getDocuments<DeductionRules>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );

    for (const rules of rulesList) {
      const startDate = parseISO(rules.start_date);
      const endDate = rules.end_date ? parseISO(rules.end_date) : null;

      if (
        (isEqual(targetDate, startDate) || isAfter(targetDate, startDate)) &&
        (endDate === null || isEqual(targetDate, endDate) || isBefore(targetDate, endDate))
      ) {
        return rules;
      }
    }

    return null;
  }

  async getAllByEmployee(employeeId: string): Promise<DeductionRules[]> {
    return firestoreRepository.getDocuments<DeductionRules>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );
  }

  async update(id: string, data: Partial<Omit<DeductionRules, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const deductionRulesRepository = new DeductionRulesRepository();

