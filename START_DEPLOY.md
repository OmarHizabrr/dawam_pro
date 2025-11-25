# 🚀 ابدأ من هنا - دليل النشر الكامل

## 📋 الخطوات السريعة

### 1️⃣ رفع على GitHub

```cmd
# تهيئة Git
git init

# إضافة الملفات
git add .

# Commit
git commit -m "Initial commit: نظام إدارة الحضور والرواتب"

# ربط مع GitHub (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dawam-pro.git

# رفع المشروع
git branch -M main
git push -u origin main
```

**⚠️ عند الطلب:**
- Username: اسم المستخدم في GitHub
- Password: Personal Access Token (ليس كلمة المرور!)

---

### 2️⃣ نشر على Vercel

#### Backend:

1. [vercel.com](https://vercel.com) → Sign Up مع GitHub
2. Add New Project → اختر `dawam-pro`
3. Settings:
   - Framework: **Other**
   - Build: `npm run build:backend:vercel`
   - Output: `dist`
4. Environment Variables:
   ```
   FIREBASE_PROJECT_ID = dawam-alhikma
   FIREBASE_CLIENT_EMAIL = ...
   FIREBASE_PRIVATE_KEY = ...
   PORT = 3000
   NODE_ENV = production
   FRONTEND_URL = (سنضيفه لاحقاً)
   ```
5. Deploy → انسخ الرابط

#### Frontend:

1. Add New Project → اختر نفس المستودع
2. Settings:
   - Framework: **Next.js**
   - Root Directory: `frontend`
3. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL = (رابط Backend من الخطوة السابقة)
   ```
4. Deploy → انسخ الرابط

#### الربط:

1. عد إلى Backend → Environment Variables
2. عدّل `FRONTEND_URL` = رابط Frontend
3. Redeploy Backend

---

## 📖 ملفات التوثيق

- **`DEPLOY_GUIDE_AR.md`** - دليل تفصيلي كامل ⭐
- **`GIT_COMMANDS.md`** - أوامر Git جاهزة
- **`VERCEL_SETTINGS.md`** - إعدادات Vercel
- **`QUICK_DEPLOY.md`** - نشر سريع

---

## ✅ النتيجة

بعد اكتمال الخطوات:
- ✅ المشروع على GitHub
- ✅ Backend يعمل على Vercel
- ✅ Frontend يعمل على Vercel
- ✅ النظام متاح على الإنترنت!

