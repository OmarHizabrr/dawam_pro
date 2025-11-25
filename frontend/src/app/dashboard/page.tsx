'use client';

import { useEffect, useState } from 'react';
import { employeesApi } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    todayAttendance: 0,
    pendingLeaves: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [allEmployees, activeEmployees] = await Promise.all([
        employeesApi.getAll(),
        employeesApi.getAll(true),
      ]);

      setStats({
        totalEmployees: allEmployees.data.length,
        activeEmployees: activeEmployees.data.length,
        todayAttendance: 0, // TODO: حساب الحضور اليوم
        pendingLeaves: 0, // TODO: حساب الإجازات المعلقة
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'إجمالي الموظفين',
      value: stats.totalEmployees,
      icon: '👥',
      color: 'bg-blue-500',
      href: '/dashboard/employees',
    },
    {
      title: 'الموظفون النشطون',
      value: stats.activeEmployees,
      icon: '✅',
      color: 'bg-green-500',
      href: '/dashboard/employees?active=true',
    },
    {
      title: 'حضور اليوم',
      value: stats.todayAttendance,
      icon: '📅',
      color: 'bg-yellow-500',
      href: '/dashboard/attendance',
    },
    {
      title: 'إجازات معلقة',
      value: stats.pendingLeaves,
      icon: '🏖️',
      color: 'bg-orange-500',
      href: '/dashboard/leaves',
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">لوحة التحكم</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/employees/new">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              إضافة موظف جديد
            </button>
          </Link>
          <Link href="/dashboard/attendance/new">
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              تسجيل حضور
            </button>
          </Link>
          <Link href="/dashboard/leaves/new">
            <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              إضافة إجازة
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

