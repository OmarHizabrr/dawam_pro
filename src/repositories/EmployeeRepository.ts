import { firestoreRepository } from '../lib/FirestoreRepository';
import { Employee } from '../types/models';

export class EmployeeRepository {
  private readonly collectionName = 'employees';

  async create(employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = firestoreRepository.getNewId(this.collectionName);
    await firestoreRepository.setDocument(this.collectionName, id, employee);
    return id;
  }

  async getById(id: string): Promise<Employee | null> {
    return firestoreRepository.getDocument<Employee>(this.collectionName, id);
  }

  async getAll(): Promise<Employee[]> {
    return firestoreRepository.getDocuments<Employee>(this.collectionName);
  }

  async getActive(): Promise<Employee[]> {
    return firestoreRepository.getDocuments<Employee>(
      this.collectionName,
      [{ field: 'status', operator: '==', value: 'active' }]
    );
  }

  async update(id: string, data: Partial<Omit<Employee, 'id' | 'createdAt'>>): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    await firestoreRepository.deleteDocument(this.collectionName, id);
  }
}

export const employeeRepository = new EmployeeRepository();

