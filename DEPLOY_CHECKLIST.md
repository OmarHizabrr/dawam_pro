# ✅ قائمة التحقق للنشر

## 📦 GitHub

- [ ] إنشاء مستودع جديد على GitHub
- [ ] تهيئة Git في المشروع (`git init`)
- [ ] إضافة الملفات (`git add .`)
- [ ] إنشاء commit (`git commit`)
- [ ] ربط مع GitHub (`git remote add origin`)
- [ ] رفع المشروع (`git push`)

## 🌐 Vercel - Backend

- [ ] إنشاء حساب Vercel
- [ ] ربط المشروع مع GitHub
- [ ] إعدادات المشروع:
  - [ ] Framework: Other
  - [ ] Build Command: `npm run build:backend`
  - [ ] Output Directory: `dist`
- [ ] إضافة Environment Variables:
  - [ ] FIREBASE_PROJECT_ID
  - [ ] FIREBASE_CLIENT_EMAIL
  - [ ] FIREBASE_PRIVATE_KEY
  - [ ] PORT
  - [ ] NODE_ENV
  - [ ] FRONTEND_URL
- [ ] النشر
- [ ] اختبار: `https://your-backend.vercel.app/health`

## 🌐 Vercel - Frontend

- [ ] إنشاء مشروع جديد في Vercel
- [ ] ربط مع نفس المستودع
- [ ] إعدادات المشروع:
  - [ ] Framework: Next.js
  - [ ] Root Directory: `frontend`
- [ ] إضافة Environment Variables:
  - [ ] NEXT_PUBLIC_API_URL
- [ ] النشر
- [ ] اختبار: `https://your-frontend.vercel.app`

## 🔗 الربط

- [ ] تحديث `FRONTEND_URL` في Backend برابط Frontend
- [ ] تحديث `NEXT_PUBLIC_API_URL` في Frontend برابط Backend
- [ ] إعادة نشر كلا المشروعين

## ✅ الاختبار النهائي

- [ ] Backend API يعمل
- [ ] Frontend يعمل
- [ ] Frontend يتصل بالـ Backend
- [ ] جميع الصفحات تعمل

