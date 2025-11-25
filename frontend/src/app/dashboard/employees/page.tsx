'use client';

import { useEffect, useState } from 'react';
import { employeesApi } from '@/lib/api';
import { useMessage } from '@/lib/messageService';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  hire_date: string;
  currency: string;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active'>('all');
  const { showMessage, showConfirm } = useMessage();

  useEffect(() => {
    loadEmployees();
  }, [filter]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeesApi.getAll(filter === 'active' ? true : undefined);
      setEmployees(response.data);
    } catch (error) {
      showMessage('حدث خطأ في تحميل الموظفين', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      `هل أنت متأكد من حذف الموظف "${name}"؟`,
      async () => {
        try {
          await employeesApi.delete(id);
          showMessage('تم حذف الموظف بنجاح', 'success');
          loadEmployees();
        } catch (error) {
          showMessage('حدث خطأ في حذف الموظف', 'error');
        }
      },
      undefined,
      'حذف',
      'إلغاء',
      'danger'
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">الموظفون</h2>
        <Link href="/dashboard/employees/new">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            إضافة موظف جديد
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          النشطون فقط
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التوظيف</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العملة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  لا يوجد موظفون
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(employee.hire_date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/employees/${employee.id}`}>
                        <button className="text-blue-600 hover:text-blue-900">عرض</button>
                      </Link>
                      <Link href={`/dashboard/employees/${employee.id}/edit`}>
                        <button className="text-yellow-600 hover:text-yellow-900">تعديل</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(employee.id, employee.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

