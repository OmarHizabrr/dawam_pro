import { firestoreRepository } from '../lib/FirestoreRepository';
import { LeaveBalance, LeaveType } from '../types/models';

export class LeaveBalanceRepository {
  private readonly collectionName = 'leave_balances';

  /**
   * الحصول على رصيد إجازة معين
   */
  async getBalance(employeeId: string, leaveType: LeaveType): Promise<LeaveBalance | null> {
    const balances = await firestoreRepository.getDocuments<LeaveBalance>(
      this.collectionName,
      [
        { field: 'employee_id', operator: '==', value: employeeId },
        { field: 'leave_type', operator: '==', value: leaveType },
      ],
      1
    );

    return balances.length > 0 ? balances[0] : null;
  }

  /**
   * الحصول على جميع أرصدة الإجازات لموظف
   */
  async getAllBalances(employeeId: string): Promise<LeaveBalance[]> {
    return firestoreRepository.getDocuments<LeaveBalance>(
      this.collectionName,
      [{ field: 'employee_id', operator: '==', value: employeeId }]
    );
  }

  /**
   * إنشاء أو تحديث رصيد إجازة
   */
  async setBalance(balance: Omit<LeaveBalance, 'createdAt' | 'updatedAt'>): Promise<void> {
    const docId = `${balance.employee_id}_${balance.leave_type}`;
    await firestoreRepository.setDocument(this.collectionName, docId, balance);
  }

  /**
   * خصم من رصيد الإجازة
   */
  async deductBalance(
    employeeId: string,
    leaveType: LeaveType,
    minutes: number
  ): Promise<{ success: boolean; deducted: number; remaining: number }> {
    const balance = await this.getBalance(employeeId, leaveType);

    if (!balance) {
      return { success: false, deducted: 0, remaining: 0 };
    }

    if (!balance.is_active) {
      return { success: false, deducted: 0, remaining: balance.balance_minutes };
    }

    const deducted = Math.min(minutes, balance.balance_minutes);
    const remaining = balance.balance_minutes - deducted;

    await firestoreRepository.updateDocument(this.collectionName, `${employeeId}_${leaveType}`, {
      balance_minutes: remaining,
    });

    return { success: true, deducted, remaining };
  }

  /**
   * إضافة إلى رصيد الإجازة
   */
  async addBalance(
    employeeId: string,
    leaveType: LeaveType,
    minutes: number
  ): Promise<void> {
    const balance = await this.getBalance(employeeId, leaveType);

    if (!balance) {
      throw new Error(`Leave balance not found for employee ${employeeId} and type ${leaveType}`);
    }

    const newBalance = balance.balance_minutes + minutes;

    await firestoreRepository.updateDocument(this.collectionName, `${employeeId}_${leaveType}`, {
      balance_minutes: newBalance,
    });
  }

  /**
   * تفعيل أو إيقاف نوع إجازة
   */
  async setActive(employeeId: string, leaveType: LeaveType, isActive: boolean): Promise<void> {
    await firestoreRepository.updateDocument(this.collectionName, `${employeeId}_${leaveType}`, {
      is_active: isActive,
    });
  }
}

export const leaveBalanceRepository = new LeaveBalanceRepository();

