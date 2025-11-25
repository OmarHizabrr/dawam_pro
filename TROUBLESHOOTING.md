# استكشاف الأخطاء وحلها

## مشكلة: Cannot find module 'firebase-admin' or 'date-fns'

### الحل 1: إعادة تشغيل TypeScript Server

في VS Code:
1. اضغط `Ctrl + Shift + P`
2. اكتب: `TypeScript: Restart TS Server`
3. اضغط Enter

### الحل 2: التحقق من التثبيت

```bash
# التحقق من وجود الحزم
dir node_modules\firebase-admin
dir node_modules\date-fns

# إذا لم تكن موجودة، قم بالتثبيت
npm install firebase-admin date-fns
```

### الحل 3: تنظيف وإعادة التثبيت

```bash
# حذف node_modules و package-lock.json
rmdir /s /q node_modules
del package-lock.json

# إعادة التثبيت
npm install
```

### الحل 4: إذا استمرت المشكلة

1. أغلق VS Code تماماً
2. افتح Command Prompt كمسؤول (Run as Administrator)
3. انتقل إلى مجلد المشروع
4. قم بتشغيل:
```bash
npm install
```
5. أعد فتح VS Code

## مشكلة: EPERM errors أثناء التثبيت

هذه المشكلة تحدث عندما تكون بعض الملفات قيد الاستخدام.

### الحل:

1. أغلق VS Code وكل البرامج التي قد تستخدم الملفات
2. افتح Command Prompt كمسؤول
3. قم بتشغيل:
```bash
npm install --force
```

أو:

```bash
# حذف node_modules يدوياً
rmdir /s /q node_modules
npm install
```

## مشكلة: esbuild EFTYPE error

هذه مشكلة في esbuild وليست في الحزم المطلوبة.

### الحل:

```bash
# إعادة تثبيت esbuild
npm install esbuild --force

# أو حذف node_modules وإعادة التثبيت
rmdir /s /q node_modules
npm install
```

## التحقق من أن كل شيء يعمل

بعد التثبيت، تحقق من:

```bash
# التحقق من الحزم
npm list firebase-admin date-fns

# محاولة تشغيل المشروع
npm run dev
```

إذا لم تظهر أخطاء، فالمشروع يعمل بشكل صحيح حتى لو ظهرت أخطاء في VS Code.

## ملاحظات

- أخطاء TypeScript في VS Code قد تظهر حتى لو كانت الحزم مثبتة
- إعادة تشغيل TS Server عادة ما يحل المشكلة
- تأكد من أنك في المجلد الصحيح عند تشغيل الأوامر

