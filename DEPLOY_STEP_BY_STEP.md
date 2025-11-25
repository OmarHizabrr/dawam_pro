# 🚀 دليل النشر خطوة بخطوة

## 📦 الجزء 1: رفع المشروع على GitHub

### الخطوة 1: إنشاء مستودع GitHub

1. **اذهب إلى GitHub:**
   - افتح [github.com](https://github.com)
   - سجّل الدخول

2. **إنشاء مستودع جديد:**
   - انقر على **"+"** في الزاوية اليمنى
   - اختر **"New repository"**

3. **املأ البيانات:**
   ```
   Repository name: dawam-pro
   Description: نظام إدارة حضور وغياب وإجازات ورواتب
   Visibility: Public (أو Private حسب رغبتك)
   ```
   - **⚠️ مهم:** لا تضع علامة على "Add a README file"
   - **⚠️ مهم:** لا تضع علامة على "Add .gitignore"

4. **انقر "Create repository"**

### الخطوة 2: إعداد Git في المشروع

افتح **Command Prompt** أو **PowerShell** في مجلد المشروع:

```cmd
# 1. التحقق من Git
git --version

# إذا لم يكن مثبتاً، حمّله من: https://git-scm.com/downloads
```

### الخطوة 3: تهيئة Git

```cmd
# 2. تهيئة Git
git init

# 3. إضافة جميع الملفات
git add .

# 4. إنشاء commit
git commit -m "Initial commit: نظام إدارة الحضور والرواتب"
```

### الخطوة 4: ربط المشروع مع GitHub

```cmd
# 5. إضافة remote (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dawam-pro.git

# 6. تغيير اسم الفرع إلى main
git branch -M main

# 7. رفع المشروع
git push -u origin main
```

**مثال:**
```cmd
git remote add origin https://github.com/ahmed123/dawam-pro.git
git branch -M main
git push -u origin main
```

### الخطوة 5: إدخال بيانات GitHub

عند الطلب:
- **Username**: اسم المستخدم في GitHub
- **Password**: Personal Access Token (ليس كلمة المرور!)

**لإنشاء Personal Access Token:**

1. GitHub → **Settings** (من قائمة الملف الشخصي)
2. **Developer settings** (في القائمة الجانبية)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. املأ:
   - **Note**: `dawam-pro-deploy`
   - **Expiration**: اختر المدة
   - **Select scopes**: ✅ `repo` (كل الصلاحيات)
6. **Generate token**
7. **انسخ الـ Token** (سيظهر مرة واحدة فقط!)
8. استخدمه ككلمة مرور عند `git push`

---

## 🌐 الجزء 2: نشر المشروع على Vercel

### الخطوة 1: إنشاء حساب Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. انقر **"Sign Up"**
3. اختر **"Continue with GitHub"**
4. سجّل الدخول بحساب GitHub
5. امنح Vercel الصلاحيات المطلوبة

### الخطوة 2: ربط المشروع

1. في Vercel Dashboard، انقر **"Add New..."** → **"Project"**
2. اختر المستودع `dawam-pro` من القائمة
3. انقر **"Import"**

### الخطوة 3: إعدادات المشروع

#### للـ Backend (Node.js API):

**Configure Project:**
- **Framework Preset**: `Other`
- **Root Directory**: `.` (فارغ)
- **Build Command**: `npm run build:backend`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### للـ Frontend (Next.js):

**Configure Project:**
- **Framework Preset**: `Next.js`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (سيتم تلقائياً)
- **Output Directory**: `.next` (سيتم تلقائياً)
- **Install Command**: `npm install`

### الخطوة 4: إضافة Environment Variables

في صفحة إعدادات المشروع:

1. انقر **"Environment Variables"**
2. أضف المتغيرات التالية (لكل مشروع):

**للـ Backend:**
```
FIREBASE_PROJECT_ID = dawam-alhikma
FIREBASE_CLIENT_EMAIL = your-service-account@dawam-alhikma.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PORT = 3000
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app
```

**للـ Frontend:**
```
NEXT_PUBLIC_API_URL = https://your-backend.vercel.app
```

3. اختر **Environment**: `Production`, `Preview`, `Development`
4. انقر **"Save"**

### الخطوة 5: النشر

1. انقر **"Deploy"**
2. انتظر حتى ينتهي البناء (2-5 دقائق)
3. عند اكتمال البناء، ستحصل على رابط مثل:
   - `https://dawam-pro-backend.vercel.app`
   - `https://dawam-pro-frontend.vercel.app`

---

## 🔄 تحديث المشروع

عند إجراء تغييرات:

```cmd
# 1. إضافة التغييرات
git add .

# 2. إنشاء commit
git commit -m "وصف التغييرات"

# 3. رفع التغييرات
git push

# Vercel سيقوم بنشر التحديثات تلقائياً!
```

---

## ✅ التحقق من النشر

### Backend:
افتح: `https://your-backend.vercel.app/health`

يجب أن ترى:
```json
{"status":"ok","timestamp":"..."}
```

### Frontend:
افتح: `https://your-frontend.vercel.app`

يجب أن ترى لوحة التحكم.

---

## 🆘 حل المشاكل الشائعة

### مشكلة: Build failed في Vercel

**الحل:**
1. تحقق من **Deployment Logs** في Vercel
2. تأكد من أن `package.json` يحتوي على scripts صحيحة
3. تحقق من أن جميع التبعيات موجودة في `package.json`

### مشكلة: Environment Variables لا تعمل

**الحل:**
1. تأكد من إضافة المتغيرات في Vercel
2. تحقق من صحة `FIREBASE_PRIVATE_KEY` (يجب أن يحتوي على `\n`)
3. أعد نشر المشروع بعد إضافة المتغيرات

### مشكلة: CORS Error

**الحل:**
1. أضف رابط Frontend في `FRONTEND_URL` في Vercel
2. تأكد من إعدادات CORS في `src/server.ts`

### مشكلة: Cannot find module

**الحل:**
1. تأكد من أن `package.json` يحتوي على جميع التبعيات
2. تحقق من `installCommand` في Vercel

---

## 📋 قائمة التحقق

- [ ] إنشاء مستودع GitHub
- [ ] تهيئة Git في المشروع
- [ ] رفع المشروع على GitHub
- [ ] إنشاء حساب Vercel
- [ ] ربط المشروع مع Vercel
- [ ] إضافة Environment Variables
- [ ] نشر Backend
- [ ] نشر Frontend
- [ ] اختبار Backend API
- [ ] اختبار Frontend
- [ ] تحديث `FRONTEND_URL` في Backend
- [ ] تحديث `NEXT_PUBLIC_API_URL` في Frontend

---

## 🎉 مبروك!

بعد اكتمال الخطوات، سيكون لديك:
- ✅ مشروع على GitHub
- ✅ Backend يعمل على Vercel
- ✅ Frontend يعمل على Vercel
- ✅ نظام كامل متاح على الإنترنت!

