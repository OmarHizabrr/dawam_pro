# 🔧 إصلاح خطأ 404 في Vercel

## ❌ المشكلة:
```
404: NOT_FOUND
Code: NOT_FOUND
```

---

## ✅ الحلول:

### الحل 1: تحديث إعدادات Vercel (موصى به)

1. **اذهب إلى Vercel Dashboard:**
   - https://vercel.com/dashboard
   - اختر مشروع `dawam-pro`

2. **اذهب إلى Settings:**
   - اضغط "Settings" في القائمة الجانبية

3. **تحقق من General Settings:**
   - **Root Directory:** يجب أن يكون `frontend` (ليس `./`)
   - **Framework Preset:** يجب أن يكون `Next.js`
   - **Build Command:** `npm run build` (أو اتركه فارغاً)
   - **Output Directory:** `.next` (أو اتركه فارغاً)
   - **Install Command:** `npm install` (أو اتركه فارغاً)

4. **احفظ التغييرات**

5. **أعد النشر:**
   - اضغط "Deployments"
   - اضغط "Redeploy" على آخر deployment
   - أو ارفع تحديث جديد إلى GitHub

---

### الحل 2: حذف وإعادة إنشاء المشروع

إذا لم يعمل الحل الأول:

1. **احذف المشروع من Vercel:**
   - Settings → Delete Project

2. **أنشئ مشروع جديد:**
   - Add New Project
   - اختر `OmarHizabrr/dawam_pro`
   - **Root Directory:** `frontend` ⚠️
   - **Framework:** Next.js
   - Deploy

---

### الحل 3: التحقق من الملفات

تأكد من وجود:
- ✅ `frontend/package.json`
- ✅ `frontend/next.config.ts`
- ✅ `frontend/src/app/page.tsx`
- ✅ `frontend/src/app/layout.tsx`

---

### الحل 4: رفع التحديثات إلى GitHub

بعد تعديل `vercel.json`:

```powershell
git add vercel.json
git commit -m "Fix Vercel configuration"
git push
```

Vercel سيعيد النشر تلقائياً.

---

## 🔍 التحقق من المشكلة:

### إذا كان Root Directory = `./`:
- Vercel سيحاول بناء المشروع من الجذر
- لكن Next.js موجود في `frontend/`
- لذلك يحدث خطأ 404

### الحل:
- **Root Directory:** `frontend` ✅

---

## 📝 خطوات سريعة:

1. **في Vercel Dashboard:**
   - Settings → General
   - Root Directory: `frontend`
   - Save

2. **أعد النشر:**
   - Deployments → Redeploy

3. **انتظر 2-3 دقائق**

4. **تحقق من الموقع:**
   - https://dawam-pro-alhikma.vercel.app/

---

## ✅ بعد الإصلاح:

يجب أن يعمل الموقع بشكل صحيح:
- الصفحة الرئيسية: `/`
- Dashboard: `/dashboard`
- الموظفين: `/dashboard/employees`

---

## 🔄 إذا استمرت المشكلة:

1. **تحقق من Build Logs:**
   - Deployments → اختر deployment → View Build Logs
   - ابحث عن أخطاء

2. **تحقق من Environment Variables:**
   - Settings → Environment Variables
   - تأكد من إضافة جميع متغيرات Firebase

3. **جرب حذف وإعادة إنشاء المشروع**

