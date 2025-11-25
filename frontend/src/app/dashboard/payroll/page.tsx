'use client';

import { useEffect, useState } from 'react';
import { employeesApi, payrollApi } from '@/lib/api';
import { useMessage } from '@/lib/messageService';
import { format, subMonths } from 'date-fns';

interface Employee {
  id: string;
  name: string;
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [periodStart, setPeriodStart] = useState(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
  const [periodEnd, setPeriodEnd] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [calculation, setCalculation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeesApi.getAll(true);
      setEmployees(response.data);
    } catch (error) {
      showMessage('حدث خطأ في تحميل الموظفين', 'error');
    }
  };

  const handleCalculate = async () => {
    if (!selectedEmployee) {
      showMessage('يرجى اختيار موظف', 'warning');
      return;
    }

    try {
      setLoading(true);
      const response = await payrollApi.calculate(selectedEmployee, periodStart, periodEnd);
      setCalculation(response.data);
    } catch (error) {
      showMessage('حدث خطأ في حساب الراتب', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">حساب الرواتب</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculation Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">إعدادات الحساب</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الموظف
              </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                من تاريخ
              </label>
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                إلى تاريخ
              </label>
              <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'جاري الحساب...' : 'حساب الراتب'}
            </button>
          </div>
        </div>

        {/* Calculation Result */}
        {calculation && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">نتيجة الحساب</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">إجمالي الأيام</p>
                  <p className="text-2xl font-bold">{calculation.total_days}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">أيام الحضور</p>
                  <p className="text-2xl font-bold text-green-600">{calculation.present_days}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">أيام الغياب</p>
                  <p className="text-2xl font-bold text-red-600">{calculation.absent_days}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">أيام الإجازة</p>
                  <p className="text-2xl font-bold text-blue-600">{calculation.leave_days}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">الراتب الأساسي:</span>
                  <span className="font-medium">{calculation.base_salary.toLocaleString()} {calculation.currency}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">الخصومات:</span>
                  <span className="font-medium text-red-600">-{calculation.total_deduction_amount.toFixed(2)} {calculation.currency}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-semibold text-gray-900">الراتب الصافي:</span>
                  <span className="text-2xl font-bold text-green-600">{calculation.net_salary.toFixed(2)} {calculation.currency}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

