# توثيق API

## Base URL
```
http://localhost:3000/api/v1
```

## الموظفون (Employees)

### GET /employees
الحصول على قائمة الموظفين

**Query Parameters:**
- `active` (optional): `true` للحصول على الموظفين النشطين فقط

**Response:**
```json
[
  {
    "id": "emp123",
    "name": "عمر هزبر",
    "hire_date": "2024-01-01",
    "currency": "YER",
    "status": "active"
  }
]
```

### POST /employees
إضافة موظف جديد

**Request Body:**
```json
{
  "name": "عمر هزبر",
  "hire_date": "2024-01-01",
  "currency": "YER",
  "status": "active"
}
```

### GET /employees/:id
الحصول على تفاصيل موظف

### PUT /employees/:id
تحديث موظف

### DELETE /employees/:id
حذف موظف

## جداول الدوام (Schedules)

### GET /schedules/employee/:employeeId
الحصول على جميع جداول الدوام لموظف

### GET /schedules/employee/:employeeId/active?date=2025-05-28
الحصول على جدول الدوام الفعّال في تاريخ معين

### POST /schedules
إنشاء جدول دوام جديد

**Request Body:**
```json
{
  "employee_id": "emp123",
  "start_date": "2025-05-20",
  "end_date": null,
  "type": "daily_hours",
  "config": {
    "required_hours": 8
  }
}
```

## الحضور (Attendance)

### POST /attendance
تسجيل حضور

**Request Body:**
```json
{
  "employee_id": "emp123",
  "date": "2025-05-28",
  "check_in": "2025-05-28T08:00:00Z",
  "check_out": null
}
```

### GET /attendance/employee/:employeeId/date/:date
الحصول على سجل حضور في تاريخ معين

### GET /attendance/evaluate/:employeeId/:date
تقييم يوم واحد (حساب الحضور والخصومات)

**Response:**
```json
{
  "date": "2025-05-28",
  "employee_id": "emp123",
  "status": "present",
  "worked_minutes": 480,
  "required_minutes": 480,
  "late_minutes": 0,
  "early_leave_minutes": 0,
  "deduction_minutes": 0,
  "deduction_amount": 0,
  "leave_balance_deducted": 0,
  "notes": []
}
```

## الإجازات (Leaves)

### GET /leaves/employee/:employeeId
الحصول على جميع الإجازات لموظف

### POST /leaves
إضافة إجازة

**Request Body:**
```json
{
  "employee_id": "emp123",
  "type": "annual_leave",
  "start_date": "2025-05-28",
  "end_date": "2025-05-28",
  "minutes": 480,
  "authorized": true
}
```

### GET /leaves/balances/:employeeId
الحصول على أرصدة الإجازات لموظف

### POST /leaves/balances
تعيين رصيد إجازة

**Request Body:**
```json
{
  "employee_id": "emp123",
  "leave_type": "annual_leave",
  "balance_minutes": 7200,
  "recharge_cycle": "yearly",
  "allow_overdraft": false,
  "is_active": true,
  "deduct_from_salary_when_empty": true,
  "requires_supervisor_approval": false
}
```

## الرواتب (Payroll)

### GET /payroll/calculate/:employeeId?periodStart=2025-05-01&periodEnd=2025-05-31
حساب الراتب لفترة معينة

**Response:**
```json
{
  "employee_id": "emp123",
  "period_start": "2025-05-01",
  "period_end": "2025-05-31",
  "base_salary": 300000,
  "currency": "YER",
  "total_days": 31,
  "present_days": 25,
  "absent_days": 2,
  "leave_days": 4,
  "total_worked_minutes": 12000,
  "total_required_minutes": 12480,
  "total_deduction_minutes": 480,
  "total_deduction_amount": 11538.46,
  "gross_salary": 300000,
  "net_salary": 288461.54
}
```

### GET /payroll/cycle/:employeeId?cycle=monthly&referenceDate=2025-05-15
حساب الراتب حسب دورة الدفع

**Cycle Options:**
- `daily`
- `weekly`
- `10_days`
- `biweekly`
- `monthly`
- `quarterly`
- `yearly`

## Health Check

### GET /health
التحقق من حالة الخادم

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-05-28T10:00:00.000Z"
}
```

