# هيكل المشروع

## Backend (Node.js + Express + TypeScript)

```
src/
├── config/
│   ├── firebase.ts              # إعدادات Firebase Admin SDK
│   └── firebase-client.ts       # إعدادات Firebase Client SDK
├── types/
│   └── models.ts                # جميع أنواع البيانات
├── lib/
│   └── FirestoreRepository.ts   # مستودع عام للتعامل مع Firestore
├── repositories/
│   ├── EmployeeRepository.ts
│   ├── ScheduleRepository.ts
│   ├── LeaveRepository.ts
│   ├── LeaveBalanceRepository.ts
│   ├── AttendanceRepository.ts
│   ├── ExemptionRepository.ts
│   ├── DeductionRulesRepository.ts
│   └── PayrollRepository.ts
├── services/
│   ├── DayEvaluationService.ts  # خوارزمية حساب حالة اليوم
│   └── PayrollService.ts        # خوارزمية حساب الرواتب
├── controllers/
│   ├── EmployeeController.ts
│   ├── AttendanceController.ts
│   └── PayrollController.ts
├── routes/
│   ├── employees.ts
│   ├── attendance.ts
│   ├── payroll.ts
│   └── index.ts
└── server.ts                    # نقطة البداية
```

## Frontend (Next.js + React + TypeScript)

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout الرئيسي
│   │   ├── page.tsx             # الصفحة الرئيسية
│   │   ├── globals.css          # الأنماط العامة
│   │   └── dashboard/
│   │       ├── layout.tsx       # Layout لوحة التحكم
│   │       ├── page.tsx         # لوحة التحكم الرئيسية
│   │       ├── employees/
│   │       │   ├── page.tsx     # قائمة الموظفين
│   │       │   └── new/
│   │       │       └── page.tsx # إضافة موظف
│   │       ├── attendance/
│   │       │   └── page.tsx    # الحضور والغياب
│   │       ├── leaves/
│   │       │   └── page.tsx    # الإجازات
│   │       ├── payroll/
│   │       │   └── page.tsx    # الرواتب
│   │       └── reports/
│   │           └── page.tsx   # التقارير
│   ├── components/
│   │   └── layout/
│   │       └── DashboardLayout.tsx
│   └── lib/
│       ├── firebase.ts          # إعدادات Firebase Client
│       ├── api.ts               # API Client
│       └── messageService.tsx   # خدمة الرسائل
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.js
```

## قاعدة البيانات (Firestore)

### المجموعات الرئيسية

- `employees` - الموظفون
- `employee_schedules` - جداول الدوام
- `leaves` - الإجازات
- `leave_balances` - أرصدة الإجازات
- `attendance_logs` - سجلات الحضور
- `exemptions` - الإعفاءات
- `deduction_rules` - قواعد الخصم
- `payroll_profiles` - ملفات الرواتب

## التدفق

1. **Frontend** → يرسل طلبات إلى **Backend API**
2. **Backend** → يستخدم **Repositories** للوصول إلى **Firestore**
3. **Services** → تحتوي على منطق الأعمال والخوارزميات
4. **Controllers** → تتعامل مع الطلبات والاستجابات
5. **Routes** → تحدد المسارات

## الملفات المهمة

- `src/server.ts` - نقطة البداية للـ Backend
- `frontend/src/app/layout.tsx` - نقطة البداية للـ Frontend
- `src/types/models.ts` - جميع أنواع البيانات
- `src/services/DayEvaluationService.ts` - خوارزمية حساب اليوم
- `src/services/PayrollService.ts` - خوارزمية حساب الراتب

