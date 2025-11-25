# 🚀 دليل النشر الكامل - خطوة بخطوة

## 📦 الجزء الأول: رفع المشروع على GitHub

### الخطوة 1: إنشاء مستودع GitHub

1. **افتح GitHub:**
   - اذهب إلى [github.com](https://github.com)
   - سجّل الدخول (أو أنشئ حساب جديد)

2. **إنشاء مستودع جديد:**
   - انقر على **"+"** في الزاوية اليمنى العليا
   - اختر **"New repository"**

3. **املأ البيانات:**
   ```
   Repository name: dawam-pro
   Description: نظام إدارة حضور وغياب وإجازات ورواتب
   Public / Private: اختر حسب رغبتك
   ```
   
   ⚠️ **مهم جداً:**
   - ❌ لا تضع علامة على "Add a README file"
   - ❌ لا تضع علامة على "Add .gitignore"
   - ❌ لا تضع علامة على "Choose a license"
   
4. **انقر "Create repository"**

### الخطوة 2: إعداد Git في المشروع

افتح **Command Prompt** أو **PowerShell** في مجلد المشروع:

```cmd
# التحقق من تثبيت Git
git --version
```

إذا لم يكن Git مثبتاً:
- حمّله من: https://git-scm.com/downloads
- ثبّته وأعد فتح Terminal

### الخطوة 3: تهيئة Git ورفع المشروع

```cmd
# 1. تهيئة Git
git init

# 2. إضافة جميع الملفات
git add .

# 3. إنشاء commit أولي
git commit -m "Initial commit: نظام إدارة الحضور والرواتب"

# 4. ربط المشروع مع GitHub
# استبدل YOUR_USERNAME باسم المستخدم في GitHub
git remote add origin https://github.com/YOUR_USERNAME/dawam-pro.git

# 5. تغيير اسم الفرع إلى main
git branch -M main

# 6. رفع المشروع
git push -u origin main
```

**مثال:**
```cmd
git remote add origin https://github.com/ahmed123/dawam-pro.git
git push -u origin main
```

### الخطوة 4: إدخال بيانات GitHub

عند الطلب، سيطلب منك:
- **Username**: اسم المستخدم في GitHub
- **Password**: **Personal Access Token** (ليس كلمة المرور العادية!)

#### كيفية إنشاء Personal Access Token:

1. في GitHub، انقر على صورتك الشخصية (أعلى اليمين)
2. اختر **Settings**
3. في القائمة الجانبية، اختر **Developer settings**
4. اختر **Personal access tokens** → **Tokens (classic)**
5. انقر **Generate new token (classic)**
6. املأ:
   - **Note**: `dawam-pro-deploy`
   - **Expiration**: اختر المدة (مثل 90 days)
   - **Select scopes**: ✅ **repo** (ضع علامة على كل الصلاحيات)
7. انقر **Generate token** في الأسفل
8. **⚠️ مهم:** انسخ الـ Token فوراً (سيظهر مرة واحدة فقط!)
9. استخدم هذا الـ Token ككلمة مرور عند `git push`

---

## 🌐 الجزء الثاني: نشر المشروع على Vercel

### الخطوة 1: إنشاء حساب Vercel

1. **اذهب إلى Vercel:**
   - افتح [vercel.com](https://vercel.com)
   - انقر **"Sign Up"**

2. **التسجيل:**
   - اختر **"Continue with GitHub"**
   - سجّل الدخول بحساب GitHub
   - امنح Vercel الصلاحيات المطلوبة

### الخطوة 2: نشر Backend (API)

1. **في Vercel Dashboard:**
   - انقر **"Add New..."** → **"Project"**

2. **ربط المشروع:**
   - اختر المستودع `dawam-pro` من القائمة
   - انقر **"Import"**

3. **إعدادات المشروع:**
   ```
   Framework Preset: Other
   Root Directory: . (فارغ)
   Build Command: npm run build:backend:vercel
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables:**
   - انقر **"Environment Variables"**
   - أضف المتغيرات التالية (انقر "Add" لكل متغير):
   
   ```
   Name: FIREBASE_PROJECT_ID
   Value: dawam-alhikma
   Environment: Production, Preview, Development (اختر الكل)
   ```
   
   ```
   Name: FIREBASE_CLIENT_EMAIL
   Value: your-service-account@dawam-alhikma.iam.gserviceaccount.com
   Environment: Production, Preview, Development
   ```
   
   ```
   Name: FIREBASE_PRIVATE_KEY
   Value: "-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
   Environment: Production, Preview, Development
   ```
   
   ```
   Name: PORT
   Value: 3000
   Environment: Production, Preview, Development
   ```
   
   ```
   Name: NODE_ENV
   Value: production
   Environment: Production, Preview, Development
   ```
   
   ```
   Name: FRONTEND_URL
   Value: https://your-frontend.vercel.app (سنضيفه لاحقاً)
   Environment: Production, Preview, Development
   ```

5. **النشر:**
   - انقر **"Deploy"**
   - انتظر حتى ينتهي البناء (2-5 دقائق)
   - ستحصل على رابط مثل: `https://dawam-pro-backend.vercel.app`
   - **انسخ هذا الرابط** - سنحتاجه للـ Frontend

### الخطوة 3: نشر Frontend (لوحة التحكم)

1. **إنشاء مشروع جديد:**
   - في Vercel Dashboard، انقر **"Add New..."** → **"Project"**
   - اختر نفس المستودع `dawam-pro`

2. **إعدادات المشروع:**
   ```
   Framework Preset: Next.js (سيتم اكتشافه تلقائياً)
   Root Directory: frontend
   Build Command: npm run build (تلقائي)
   Output Directory: .next (تلقائي)
   Install Command: npm install (تلقائي)
   ```

3. **Environment Variables:**
   - انقر **"Environment Variables"**
   - أضف:
   
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend.vercel.app (الرابط من الخطوة السابقة)
   Environment: Production, Preview, Development
   ```

4. **النشر:**
   - انقر **"Deploy"**
   - انتظر حتى ينتهي البناء
   - ستحصل على رابط مثل: `https://dawam-pro-frontend.vercel.app`
   - **انسخ هذا الرابط**

### الخطوة 4: ربط Backend و Frontend

1. **تحديث Backend:**
   - في Vercel، اذهب إلى مشروع Backend
   - **Settings** → **Environment Variables**
   - عدّل `FRONTEND_URL` وضع رابط Frontend
   - **Redeploy** المشروع

2. **تحديث Frontend:**
   - في Vercel، اذهب إلى مشروع Frontend
   - **Settings** → **Environment Variables**
   - تأكد من أن `NEXT_PUBLIC_API_URL` يحتوي على رابط Backend الصحيح
   - **Redeploy** المشروع

---

## ✅ التحقق من النشر

### اختبار Backend:

افتح في المتصفح:
```
https://your-backend.vercel.app/health
```

يجب أن ترى:
```json
{"status":"ok","timestamp":"..."}
```

### اختبار Frontend:

افتح في المتصفح:
```
https://your-frontend.vercel.app
```

يجب أن ترى لوحة التحكم.

---

## 🔄 تحديث المشروع

عند إجراء أي تغييرات:

```cmd
# 1. إضافة التغييرات
git add .

# 2. إنشاء commit
git commit -m "وصف التغييرات"

# 3. رفع التغييرات
git push

# Vercel سينشر التحديثات تلقائياً! 🎉
```

---

## 🆘 حل المشاكل

### مشكلة: Build failed في Vercel

**الحل:**
1. اذهب إلى **Deployment** → **Logs**
2. تحقق من الأخطاء
3. تأكد من أن `package.json` scripts صحيحة

### مشكلة: Environment Variables لا تعمل

**الحل:**
1. تأكد من إضافة المتغيرات في Vercel
2. تحقق من صحة `FIREBASE_PRIVATE_KEY` (يجب أن يحتوي على `\n`)
3. **Redeploy** المشروع

### مشكلة: CORS Error

**الحل:**
1. أضف رابط Frontend في `FRONTEND_URL` في Backend
2. **Redeploy** Backend

---

## 📋 قائمة التحقق النهائية

- [ ] ✅ إنشاء مستودع GitHub
- [ ] ✅ رفع المشروع على GitHub
- [ ] ✅ إنشاء حساب Vercel
- [ ] ✅ نشر Backend على Vercel
- [ ] ✅ إضافة Environment Variables للـ Backend
- [ ] ✅ نشر Frontend على Vercel
- [ ] ✅ إضافة Environment Variables للـ Frontend
- [ ] ✅ ربط Backend و Frontend
- [ ] ✅ اختبار Backend API
- [ ] ✅ اختبار Frontend
- [ ] ✅ كل شيء يعمل! 🎉

---

## 🎉 مبروك!

الآن لديك:
- ✅ مشروع على GitHub
- ✅ Backend يعمل على Vercel
- ✅ Frontend يعمل على Vercel
- ✅ نظام كامل متاح على الإنترنت!

