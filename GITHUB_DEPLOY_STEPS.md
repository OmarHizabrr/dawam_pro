# خطوات رفع المشروع إلى GitHub و Vercel

## ✅ الخطوات المكتملة:

1. ✅ تم تهيئة Git (`git init`)
2. ✅ تم إضافة الملفات (`git add .`)
3. ✅ تم إعداد Git config (user.name و user.email)
4. ✅ تم ربط المشروع مع GitHub (`git remote add origin`)

## 📝 الخطوات المتبقية:

### الخطوة 1: إنشاء Commit الأولي

في PowerShell، نفّذ:

```powershell
git commit -m "Initial commit: Attendance, Leave, and Payroll Management System"
```

### الخطوة 2: رفع الكود إلى GitHub

```powershell
git push -u origin main
```

**ملاحظة:** إذا ظهرت رسالة خطأ تقول أن الفرع `main` غير موجود، استخدم:

```powershell
git branch -M main
git push -u origin main
```

### الخطوة 3: ربط المشروع مع Vercel

#### الطريقة 1: عبر Vercel CLI

```powershell
# 1. تسجيل الدخول
vercel login

# 2. الانتقال إلى مجلد Frontend
cd frontend

# 3. نشر المشروع
vercel

# اتبع التعليمات على الشاشة
```

#### الطريقة 2: عبر موقع Vercel (أسهل)

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجّل الدخول بحساب GitHub
3. اضغط "Add New Project"
4. اختر المستودع `OmarHizaber/dawam_pro`
5. اضبط الإعدادات:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. اضغط "Deploy"

### الخطوة 4: إضافة متغيرات البيئة في Vercel

بعد النشر، أضف متغيرات البيئة في Vercel Dashboard:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

---

## 🚀 بعد النشر:

- ستحصل على رابط للموقع (مثل: `dawam-pro.vercel.app`)
- كل تحديث ترفعه إلى GitHub سيُحدث الموقع تلقائياً
