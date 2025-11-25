# إعداد Firebase للمشروع

## معلومات المشروع

- **Project ID**: `dawam-alhikma`
- **Project Name**: نظام إدارة الحضور والرواتب

## إعدادات Firebase Client SDK

### للاستخدام في Frontend (Next.js)

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAw6FJ4QIREo7p0UrOtIUakPWonEszM6-k",
  authDomain: "dawam-alhikma.firebaseapp.com",
  projectId: "dawam-alhikma",
  storageBucket: "dawam-alhikma.firebasestorage.app",
  messagingSenderId: "1023101223750",
  appId: "1:1023101223750:web:7bacc9cae17b42e5799b47",
  measurementId: "G-N11JKENYJB"
};
```

**الملفات المستخدمة:**
- `src/config/firebase-client.ts` - Backend config
- `frontend/src/lib/firebase.ts` - Frontend initialization

## إعدادات Firebase Admin SDK

### للاستخدام في Backend (Node.js)

**المتطلبات:**
1. Service Account credentials من Firebase Console
2. إضافة البيانات إلى ملف `.env`

**خطوات الحصول على Service Account:**

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروع `dawam-alhikma`
3. اذهب إلى **⚙️ Project Settings** > **Service Accounts**
4. انقر على **Generate New Private Key**
5. احفظ ملف JSON

**إعداد ملف `.env`:**

```env
FIREBASE_PROJECT_ID=dawam-alhikma
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@dawam-alhikma.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
```

**ملاحظات مهمة:**
- `FIREBASE_PRIVATE_KEY` يجب أن يحتوي على `\n` الفعلية (newlines)
- لا تضع المفتاح بين علامات اقتباس مزدوجة في ملف JSON الأصلي
- عند نسخ المفتاح، تأكد من الحفاظ على التنسيق

**الملف المستخدم:**
- `src/config/firebase.ts` - Backend Admin SDK initialization

## الخدمات المطلوبة في Firebase

### 1. Firestore Database
- **Status**: يجب تفعيلها
- **Location**: اختر أقرب موقع
- **Mode**: Production mode (بعد التطوير)

### 2. Authentication (اختياري)
- **Status**: يمكن تفعيلها لاحقاً
- **Methods**: Email/Password, Google, etc.

### 3. Storage (اختياري)
- **Status**: يمكن تفعيلها لاحقاً
- **Usage**: رفع الملفات والصور

### 4. Analytics
- **Status**: مفعّل تلقائياً
- **Measurement ID**: `G-N11JKENYJB`

## هيكل قاعدة البيانات (Firestore)

### المجموعات الرئيسية

```
employees/                    # الموظفون
  {employeeId}/
    - name
    - hire_date
    - currency
    - status

employee_schedules/           # جداول الدوام
  {scheduleId}/
    - employee_id
    - start_date
    - end_date
    - type
    - config

leaves/                       # الإجازات
  {leaveId}/
    - employee_id
    - type
    - start_date
    - end_date
    - minutes

leave_balances/              # أرصدة الإجازات
  {employeeId}_{leaveType}/
    - employee_id
    - leave_type
    - balance_minutes
    - is_active

attendance_logs/              # سجلات الحضور
  {logId}/
    - employee_id
    - date
    - check_in
    - check_out

exemptions/                   # الإعفاءات
  {exemptionId}/
    - employee_id
    - type
    - start_date
    - end_date

deduction_rules/              # قواعد الخصم
  {ruleId}/
    - employee_id
    - start_date
    - end_date
    - policies

payroll_profiles/             # ملفات الرواتب
  {profileId}/
    - employee_id
    - base_salary
    - currency
    - payment_cycle
```

## قواعد الأمان (Security Rules)

### مثال لقواعد Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // الموظفون - قراءة للجميع، كتابة للمسؤولين فقط
    match /employees/{employeeId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // سجلات الحضور - الموظف يمكنه قراءة بياناته فقط
    match /attendance_logs/{logId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // الإجازات - الموظف يمكنه قراءة بياناته فقط
    match /leaves/{leaveId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     resource.data.employee_id == request.auth.uid;
    }
  }
}
```

## اختبار الاتصال

### Backend
```bash
npm run dev
# تحقق من رسالة: ✅ Firebase Admin initialized successfully
```

### Frontend
```bash
cd frontend
npm run dev
# افتح المتصفح وتحقق من عدم وجود أخطاء في Console
```

## استكشاف الأخطاء

### خطأ: "Firebase Admin SDK initialization failed"
- تحقق من وجود ملف `.env`
- تأكد من صحة `FIREBASE_PRIVATE_KEY`
- تأكد من أن المفتاح يحتوي على `\n` الفعلية

### خطأ: "Permission denied" في Firestore
- تحقق من قواعد الأمان في Firebase Console
- تأكد من تفعيل Firestore Database

### خطأ: "API key not valid"
- تحقق من أن `apiKey` صحيح في `firebase-client.ts`
- تأكد من أن المشروع مفعّل في Firebase Console

## روابط مفيدة

- [Firebase Console](https://console.firebase.google.com/project/dawam-alhikma)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

