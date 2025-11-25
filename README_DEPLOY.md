# 📚 دليل النشر الكامل

## 🎯 نظرة عامة

هذا المشروع يتكون من:
- **Backend**: Node.js + Express API
- **Frontend**: Next.js Dashboard

يمكن نشرهما معاً أو منفصلين.

---

## 📦 الجزء 1: GitHub

### الخطوة 1: إنشاء مستودع

1. [github.com](https://github.com) → **New repository**
2. الاسم: `dawam-pro`
3. **Create repository**

### الخطوة 2: رفع المشروع

```cmd
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dawam-pro.git
git branch -M main
git push -u origin main
```

**ملاحظة:** استخدم Personal Access Token ككلمة مرور.

---

## 🌐 الجزء 2: Vercel

### Backend

1. **New Project** → اختر `dawam-pro`
2. **Settings:**
   ```
   Framework: Other
   Root Directory: .
   Build Command: npm run build:backend:vercel
   Output Directory: dist
   Install Command: npm install
   ```
3. **Environment Variables:**
   ```
   FIREBASE_PROJECT_ID=dawam-alhikma
   FIREBASE_CLIENT_EMAIL=...
   FIREBASE_PRIVATE_KEY=...
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
4. **Deploy**

### Frontend

1. **New Project** → اختر نفس المستودع
2. **Settings:**
   ```
   Framework: Next.js
   Root Directory: frontend
   ```
3. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
   ```
4. **Deploy**

---

## 🔄 التحديثات

```cmd
git add .
git commit -m "Update"
git push
```

Vercel سينشر التحديثات تلقائياً!

---

## 📖 الملفات المرجعية

- `DEPLOY_STEP_BY_STEP.md` - دليل تفصيلي
- `QUICK_DEPLOY.md` - أوامر سريعة
- `DEPLOY_CHECKLIST.md` - قائمة التحقق

