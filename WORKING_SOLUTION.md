# ✅ الحل النهائي - طريقة العمل

## المشكلة

`tsx` و `esbuild` لديهم مشاكل في التثبيت بسبب ملفات تالفة.

## الحل المضمون

### الطريقة 1: بناء ثم تشغيل (موصى به)

```powershell
# خطوة 1: بناء المشروع
npm run build:backend

# خطوة 2: تشغيل المشروع
npm run start
```

أو في سطر واحد:
```powershell
npm run dev
```

### الطريقة 2: تثبيت TypeScript عالمياً

```powershell
npm install -g typescript
```

ثم:
```powershell
tsc --skipLibCheck
node dist/server.js
```

### الطريقة 3: استخدام ts-node (إذا كان مثبتاً)

```powershell
npx ts-node src/server.ts
```

## الأوامر الجاهزة

### لتشغيل Backend:
```powershell
npm run dev
```

هذا الأمر سيقوم بـ:
1. بناء المشروع (`tsc`)
2. تشغيل المشروع (`node dist/server.js`)

### لتشغيل Frontend:
```powershell
cd frontend
npm run dev
```

## إذا فشل البناء

### الحل 1: تثبيت TypeScript عالمياً
```powershell
npm install -g typescript
```

### الحل 2: استخدام npx مع TypeScript
```powershell
npx -p typescript tsc --skipLibCheck
node dist/server.js
```

### الحل 3: استخدام ts-node مباشرة
```powershell
npx ts-node src/server.ts
```

## ملفات مساعدة

- `start.ps1` - Script لتشغيل Backend
- `run-frontend.ps1` - Script لتشغيل Frontend

## ملاحظة مهمة

حتى لو فشل `npm run dev`، يمكنك دائماً:
1. بناء المشروع يدوياً: `tsc --skipLibCheck`
2. تشغيله: `node dist/server.js`

المشروع سيعمل بشكل صحيح!

