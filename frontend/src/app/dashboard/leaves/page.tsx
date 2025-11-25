'use client';

import { useEffect, useState } from 'react';
import { employeesApi } from '@/lib/api';
import { useMessage } from '@/lib/messageService';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
}

interface LeaveBalance {
  employee_id: string;
  leave_type: string;
  balance_minutes: number;
  is_active: boolean;
}

export default function LeavesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      loadBalances();
    }
  }, [selectedEmployee]);

  const loadEmployees = async () => {
    try {
      const response = await employeesApi.getAll(true);
      setEmployees(response.data);
    } catch (error) {
      showMessage('حدث خطأ في تحميل الموظفين', 'error');
    }
  };

  const loadBalances = async () => {
    try {
      setLoading(true);
      // TODO: استدعاء API للحصول على أرصدة الإجازات
      // const response = await leavesApi.getBalances(selectedEmployee);
      // setBalances(response.data);
      showMessage('ميزة أرصدة الإجازات قيد التطوير', 'info');
    } catch (error) {
      showMessage('حدث خطأ في تحميل أرصدة الإجازات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatMinutes = (minutes: number) => {
    const days = Math.floor(minutes / 480);
    const hours = Math.floor((minutes % 480) / 60);
    const mins = minutes % 60;
    
    if (days > 0) {
      return `${days} يوم ${hours} ساعة`;
    } else if (hours > 0) {
      return `${hours} ساعة ${mins} دقيقة`;
    } else {
      return `${mins} دقيقة`;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">الإجازات</h2>
        <Link href="/dashboard/leaves/new">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            إضافة إجازة
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">اختر الموظف</h3>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">اختر الموظف</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Leave Balances */}
        {selectedEmployee && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">أرصدة الإجازات</h3>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : balances.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>لا توجد أرصدة إجازات مسجلة</p>
              </div>
            ) : (
              <div className="space-y-3">
                {balances.map((balance, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{balance.leave_type}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        balance.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {balance.is_active ? 'نشط' : 'معطل'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                      {formatMinutes(balance.balance_minutes)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Message */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 يمكنك إدارة أرصدة الإجازات لكل موظف. كل نوع إجازة له رصيد مستقل بالدقائق.
        </p>
      </div>
    </div>
  );
}
