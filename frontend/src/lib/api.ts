import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employees API
export const employeesApi = {
  getAll: (active?: boolean) => api.get('/api/v1/employees', { params: { active } }),
  getById: (id: string) => api.get(`/api/v1/employees/${id}`),
  create: (data: unknown) => api.post('/api/v1/employees', data),
  update: (id: string, data: unknown) => api.put(`/api/v1/employees/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/employees/${id}`),
};

// Attendance API
export const attendanceApi = {
  create: (data: unknown) => api.post('/api/v1/attendance', data),
  getByDate: (employeeId: string, date: string) => 
    api.get(`/api/v1/attendance/employee/${employeeId}/date/${date}`),
  getEmployeeAttendance: (employeeId: string, startDate?: string, endDate?: string) =>
    api.get(`/api/v1/attendance/employee/${employeeId}`, { params: { startDate, endDate } }),
  evaluateDay: (employeeId: string, date: string) =>
    api.get(`/api/v1/attendance/evaluate/${employeeId}/${date}`),
};

// Payroll API
export const payrollApi = {
  calculate: (employeeId: string, periodStart: string, periodEnd: string) =>
    api.get(`/api/v1/payroll/calculate/${employeeId}`, { params: { periodStart, periodEnd } }),
  calculateByCycle: (employeeId: string, cycle: string, referenceDate?: string) =>
    api.get(`/api/v1/payroll/cycle/${employeeId}`, { params: { cycle, referenceDate } }),
};

// Schedules API
export const schedulesApi = {
  getAll: (employeeId: string) => api.get(`/api/v1/schedules/employee/${employeeId}`),
  getActive: (employeeId: string, date: string) =>
    api.get(`/api/v1/schedules/employee/${employeeId}/active`, { params: { date } }),
  create: (data: unknown) => api.post('/api/v1/schedules', data),
  update: (id: string, data: unknown) => api.put(`/api/v1/schedules/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/schedules/${id}`),
};

// Leaves API
export const leavesApi = {
  getAll: (employeeId: string) => api.get(`/api/v1/leaves/employee/${employeeId}`),
  getById: (id: string) => api.get(`/api/v1/leaves/${id}`),
  create: (data: unknown) => api.post('/api/v1/leaves', data),
  update: (id: string, data: unknown) => api.put(`/api/v1/leaves/${id}`, data),
  delete: (id: string) => api.delete(`/api/v1/leaves/${id}`),
  getBalances: (employeeId: string) => api.get(`/api/v1/leaves/balances/${employeeId}`),
  setBalance: (data: unknown) => api.post('/api/v1/leaves/balances', data),
  setBalanceActive: (employeeId: string, leaveType: string, isActive: boolean) =>
    api.put(`/api/v1/leaves/balances/${employeeId}/${leaveType}/active`, { isActive }),
};

export default api;

