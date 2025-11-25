'use client';

import { useEffect, useState } from 'react';
import { employeesApi, attendanceApi } from '@/lib/api';
import { useMessage } from '@/lib/messageService';
import { format } from 'date-fns';

interface Employee {
  id: string;
  name: string;
}

interface AttendanceLog {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
}

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [attendance, setAttendance] = useState<AttendanceLog | null>(null);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee && selectedDate) {
      loadAttendance();
      loadEvaluation();
    }
  }, [selectedEmployee, selectedDate]);

  const loadEmployees = async () => {
    try {
      const response = await employeesApi.getAll(true);
      setEmployees(response.data);
    } catch (error) {
      showMessage('حدث خطأ في تحميل الموظفين', 'error');
    }
  };

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const response = await attendanceApi.getByDate(selectedEmployee, selectedDate);
      setAttendance(response.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setAttendance(null);
      } else {
        showMessage('حدث خطأ في تحميل بيانات الحضور', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadEvaluation = async () => {
    try {
      const response = await attendanceApi.evaluateDay(selectedEmployee, selectedDate);
      setEvaluation(response.data);
    } catch (error) {
      console.error('Error loading evaluation:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await attendanceApi.create({
        employee_id: selectedEmployee,
        date: selectedDate,
        check_in: new Date().toISOString(),
        check_out: null,
      });
      showMessage('تم تسجيل الحضور بنجاح', 'success');
      loadAttendance();
      loadEvaluation();
    } catch (error) {
      showMessage('حدث خطأ في تسجيل الحضور', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!attendance) return;

    try {
      setLoading(true);
      // TODO: Update attendance with check_out
      showMessage('تم تسجيل الخروج بنجاح', 'success');
      loadAttendance();
      loadEvaluation();
    } catch (error) {
      showMessage('حدث خطأ في تسجيل الخروج', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">الحضور والغياب</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">تسجيل الحضور</h3>
          
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
                التاريخ
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {selectedEmployee && (
              <div className="flex gap-4">
                {!attendance?.check_in ? (
                  <button
                    onClick={handleCheckIn}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    تسجيل حضور
                  </button>
                ) : (
                  <button
                    onClick={handleCheckOut}
                    disabled={loading || !!attendance?.check_out}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {attendance?.check_out ? 'تم تسجيل الخروج' : 'تسجيل خروج'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Evaluation Result */}
        {evaluation && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">تقييم اليوم</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">الحالة:</span>
                <span className={`font-medium ${
                  evaluation.status === 'present' ? 'text-green-600' :
                  evaluation.status === 'absent' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {evaluation.status === 'present' ? 'حاضر' :
                   evaluation.status === 'absent' ? 'غائب' :
                   evaluation.status === 'leave' ? 'إجازة' :
                   evaluation.status === 'exempt' ? 'معفي' :
                   'جزئي'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">الدقائق المنجزة:</span>
                <span className="font-medium">{evaluation.worked_minutes}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">الدقائق المطلوبة:</span>
                <span className="font-medium">{evaluation.required_minutes}</span>
              </div>
              
              {evaluation.deduction_minutes > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">الدقائق المخصومة:</span>
                  <span className="font-medium text-red-600">{evaluation.deduction_minutes}</span>
                </div>
              )}
              
              {evaluation.notes && evaluation.notes.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">ملاحظات:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {evaluation.notes.map((note: string, index: number) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

