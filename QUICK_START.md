# دليل البدء السريع

## الخطوات الأساسية

### 1. إعداد Backend

```bash
# تثبيت التبعيات
npm install

# إنشاء ملف .env
# انسخ البيانات من SETUP.md
```

### 2. إعداد Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروع `dawam-alhikma`
3. اذهب إلى **Project Settings** > **Service Accounts**
4. انقر على **Generate New Private Key**
5. أضف البيانات إلى ملف `.env`

### 3. تشغيل Backend

```bash
npm run dev
```

الخادم سيعمل على: `http://localhost:3000`

### 4. إعداد Frontend

```bash
cd frontend
npm install

# إنشاء ملف .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

### 5. تشغيل Frontend

```bash
npm run dev
```

لوحة التحكم ستكون على: `http://localhost:3001`

## اختبار النظام

### 1. إضافة موظف

- اذهب إلى `/dashboard/employees/new`
- املأ البيانات واضغط "حفظ"

### 2. تسجيل حضور

- اذهب إلى `/dashboard/attendance`
- اختر الموظف والتاريخ
- اضغط "تسجيل حضور"

### 3. حساب الراتب

- اذهب إلى `/dashboard/payroll`
- اختر الموظف والفترة
- اضغط "حساب الراتب"

## استكشاف الأخطاء

### Backend لا يعمل
- تأكد من وجود ملف `.env`
- تأكد من صحة بيانات Firebase
- تحقق من المنفذ 3000

### Frontend لا يتصل بالـ Backend
- تأكد من أن Backend يعمل
- تحقق من `NEXT_PUBLIC_API_URL` في `.env.local`
- تأكد من CORS في Backend

### أخطاء Firebase
- تحقق من صحة `FIREBASE_PRIVATE_KEY`
- تأكد من أن المفتاح يحتوي على `\n` الفعلية

