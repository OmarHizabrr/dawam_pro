# إصلاح أخطاء VS Code

## المشكلة

VS Code لا يكتشف `firebase-admin` و `http-errors` حتى لو كانت الحزم مثبتة.

## الحلول

### الحل 1: إعادة تشغيل TypeScript Server (الأسهل)

1. اضغط `Ctrl + Shift + P`
2. اكتب: `TypeScript: Restart TS Server`
3. اضغط Enter

### الحل 2: إعادة فتح VS Code

1. أغلق VS Code تماماً
2. افتحه مرة أخرى
3. انتظر حتى ينتهي فهرسة الملفات

### الحل 3: تحديث إعدادات VS Code

تم إنشاء ملف `.vscode/settings.json` الذي يوجه VS Code لاستخدام TypeScript من `node_modules`.

### الحل 4: التحقق من أن الحزم مثبتة

```cmd
dir node_modules\firebase-admin
```

إذا لم تكن موجودة:
```cmd
npm install firebase-admin
```

### الحل 5: إعادة بناء node_modules

```cmd
# حذف node_modules
rmdir /s /q node_modules

# إعادة التثبيت
npm install
```

## ملاحظات

- `skipLibCheck: true` في `tsconfig.json` يجب أن يتجاهل أخطاء الأنواع في المكتبات
- المشروع يعمل بشكل صحيح حتى لو ظهرت أخطاء في VS Code
- الأخطاء في VS Code لا تؤثر على عمل المشروع

## التحقق

بعد تطبيق الحلول، تحقق من:
1. إعادة تشغيل TypeScript Server
2. التحقق من أن الحزم موجودة في `node_modules`
3. فتح ملف جديد وإغلاقه لتحفيز إعادة الفهرسة

