# دليل الإعداد السريع

## الخطوات الأساسية

### 1. تثبيت التبعيات

```bash
npm install
```

### 2. إعداد Firebase

#### أ. إنشاء Service Account

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروع `dawam-alhikma`
3. اذهب إلى **Project Settings** > **Service Accounts**
4. انقر على **Generate New Private Key**
5. احفظ الملف JSON

#### ب. إعداد ملف `.env`

أنشئ ملف `.env` في جذر المشروع:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=dawam-alhikma
FIREBASE_CLIENT_EMAIL=your-service-account@dawam-alhikma.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"

# Server Configuration
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1
```

**ملاحظة مهمة**: عند نسخ `FIREBASE_PRIVATE_KEY` من ملف JSON، يجب:
- إزالة `\n` الحرفية واستبدالها بـ `\n` الفعلية
- أو نسخ المفتاح كسطر واحد مع `\n` في الوسط

### 3. تشغيل المشروع

```bash
# وضع التطوير (مع إعادة التحميل التلقائي)
npm run dev

# بناء المشروع
npm run build

# تشغيل الإنتاج
npm start
```

## اختبار API

بعد تشغيل الخادم، يمكنك اختبار API:

### Health Check
```bash
curl http://localhost:3000/health
```

### إنشاء موظف
```bash
curl -X POST http://localhost:3000/api/v1/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "عمر هزبر",
    "hire_date": "2024-01-01",
    "currency": "YER",
    "status": "active"
  }'
```

### حساب يوم واحد
```bash
curl http://localhost:3000/api/v1/attendance/evaluate/EMPLOYEE_ID/2025-05-28
```

### حساب الراتب
```bash
curl "http://localhost:3000/api/v1/payroll/calculate/EMPLOYEE_ID?periodStart=2025-05-01&periodEnd=2025-05-31"
```

## هيكل قاعدة البيانات في Firestore

سيتم إنشاء المجموعات التالية تلقائياً:

- `employees` - الموظفون
- `employee_schedules` - جداول الدوام
- `leaves` - الإجازات
- `leave_balances` - أرصدة الإجازات
- `attendance_logs` - سجلات الحضور
- `exemptions` - الإعفاءات
- `deduction_rules` - قواعد الخصم
- `payroll_profiles` - ملفات الرواتب

## استكشاف الأخطاء

### خطأ: "FIREBASE_CLIENT_EMAIL is required"
- تأكد من وجود ملف `.env`
- تأكد من صحة اسم المتغيرات

### خطأ: "Error initializing Firebase Admin"
- تحقق من صحة `FIREBASE_PRIVATE_KEY`
- تأكد من أن المفتاح يحتوي على `\n` الفعلية وليس `\\n`

### خطأ: "Cannot find module 'date-fns'"
- قم بتشغيل `npm install` مرة أخرى

