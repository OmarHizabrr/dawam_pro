# لوحة التحكم - نظام إدارة الحضور والرواتب

## التثبيت

```bash
cd frontend
npm install
```

## الإعداد

1. انسخ ملف `.env.local.example` إلى `.env.local`
2. عدّل `NEXT_PUBLIC_API_URL` إذا كان الـ backend يعمل على منفذ آخر

## التشغيل

```bash
npm run dev
```

افتح المتصفح على `http://localhost:3000`

## الصفحات المتاحة

- `/dashboard` - لوحة التحكم الرئيسية
- `/dashboard/employees` - إدارة الموظفين
- `/dashboard/attendance` - الحضور والغياب
- `/dashboard/leaves` - الإجازات
- `/dashboard/payroll` - حساب الرواتب
- `/dashboard/reports` - التقارير

## المميزات

- ✅ واجهة مستخدم عربية كاملة
- ✅ تصميم متجاوب
- ✅ ربط مع Backend API
- ✅ نظام إشعارات
- ✅ نماذج تفاعلية

