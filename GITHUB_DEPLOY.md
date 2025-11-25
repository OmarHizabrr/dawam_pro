# دليل رفع المشروع على GitHub ونشره على Vercel

## 📋 الخطوات

### الجزء 1: رفع المشروع على GitHub

#### الخطوة 1: إنشاء مستودع جديد على GitHub

1. اذهب إلى [GitHub](https://github.com)
2. سجّل الدخول إلى حسابك
3. انقر على **"+"** في الزاوية اليمنى العليا
4. اختر **"New repository"**
5. املأ البيانات:
   - **Repository name**: `dawam-pro` (أو أي اسم تريده)
   - **Description**: نظام إدارة حضور وغياب وإجازات ورواتب
   - **Visibility**: اختر Public أو Private
   - **لا** تضع علامة على "Initialize this repository with a README"
6. انقر **"Create repository"**

#### الخطوة 2: إعداد Git في المشروع

افتح Terminal في مجلد المشروع:

```cmd
# التحقق من تثبيت Git
git --version

# إذا لم يكن مثبتاً، قم بتثبيته من: https://git-scm.com/downloads
```

#### الخطوة 3: تهيئة Git في المشروع

```cmd
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# إنشاء commit أولي
git commit -m "Initial commit: نظام إدارة الحضور والرواتب"
```

#### الخطوة 4: ربط المشروع مع GitHub

```cmd
# إضافة remote (استبدل YOUR_USERNAME و YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# رفع المشروع
git branch -M main
git push -u origin main
```

**مثال:**
```cmd
git remote add origin https://github.com/yourusername/dawam-pro.git
git branch -M main
git push -u origin main
```

#### الخطوة 5: إدخال بيانات GitHub

عند الطلب، أدخل:
- **Username**: اسم المستخدم في GitHub
- **Password**: Personal Access Token (ليس كلمة المرور العادية)

**لإنشاء Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. اختر الصلاحيات: `repo`
4. انسخ الـ Token واستخدمه ككلمة مرور

---

### الجزء 2: نشر المشروع على Vercel

#### الخطوة 1: إنشاء حساب على Vercel

1. اذهب إلى [Vercel](https://vercel.com)
2. انقر **"Sign Up"**
3. اختر **"Continue with GitHub"**
4. سجّل الدخول بحساب GitHub

#### الخطوة 2: ربط المشروع مع Vercel

1. في Vercel Dashboard، انقر **"Add New Project"**
2. اختر المستودع `dawam-pro` من القائمة
3. انقر **"Import"**

#### الخطوة 3: إعدادات المشروع

**Root Directory:**
- اتركه فارغاً (للمشروع الكامل)
- أو `frontend` (إذا أردت نشر Frontend فقط)

**Framework Preset:**
- اختر **"Other"** للـ Backend
- أو **"Next.js"** للـ Frontend

**Build Command:**
- للـ Backend: `npm run build:backend`
- للـ Frontend: `cd frontend && npm run build`

**Output Directory:**
- للـ Backend: `dist`
- للـ Frontend: `frontend/.next`

**Install Command:**
- `npm install`

#### الخطوة 4: إضافة متغيرات البيئة

في صفحة إعدادات المشروع:

1. اذهب إلى **"Environment Variables"**
2. أضف المتغيرات التالية:

```
FIREBASE_PROJECT_ID=dawam-alhikma
FIREBASE_CLIENT_EMAIL=your-service-account@dawam-alhikma.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PORT=3000
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

#### الخطوة 5: النشر

1. انقر **"Deploy"**
2. انتظر حتى ينتهي البناء
3. ستحصل على رابط مثل: `https://dawam-pro.vercel.app`

---

## 📝 ملاحظات مهمة

### 1. ملف .gitignore

تأكد من وجود `.gitignore` ويحتوي على:
```
node_modules/
.env
dist/
.next/
```

### 2. متغيرات البيئة

**⚠️ مهم جداً:** لا ترفع ملف `.env` على GitHub!

استخدم Environment Variables في Vercel بدلاً منه.

### 3. Frontend و Backend منفصلان

يمكنك نشر:
- **Backend فقط** على Vercel (كـ Serverless Functions)
- **Frontend فقط** على Vercel
- **كلاهما** في مشروعين منفصلين

---

## 🔧 إعدادات Vercel الموصى بها

### للـ Backend:

```json
{
  "buildCommand": "npm run build:backend",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "framework": null
}
```

### للـ Frontend:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "cd frontend && npm install",
  "devCommand": "cd frontend && npm run dev",
  "framework": "nextjs"
}
```

---

## ✅ التحقق من النشر

بعد النشر:

1. **Backend**: `https://your-backend.vercel.app/health`
2. **Frontend**: `https://your-frontend.vercel.app`

يجب أن ترى:
- Backend: `{"status":"ok","timestamp":"..."}`
- Frontend: لوحة التحكم

---

## 🆘 حل المشاكل

### مشكلة: Build failed في Vercel

**الحل:**
- تحقق من `package.json` scripts
- تأكد من تثبيت جميع التبعيات
- تحقق من logs في Vercel

### مشكلة: Environment Variables

**الحل:**
- تأكد من إضافة جميع المتغيرات في Vercel
- تحقق من صحة القيم (خاصة `FIREBASE_PRIVATE_KEY`)

### مشكلة: CORS

**الحل:**
- أضف رابط Frontend في `FRONTEND_URL` في Vercel
- تأكد من إعدادات CORS في `src/server.ts`

