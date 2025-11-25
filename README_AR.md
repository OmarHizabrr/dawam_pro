# نظام إدارة الحضور والرواتب - دليل التشغيل

## ⚠️ مشاكل التثبيت الحالية

المشروع يواجه مشاكل في تثبيت `typescript` و `tsx` محلياً بسبب مشاكل في `esbuild`.

## ✅ الحل السريع (موصى به)

### 1. تثبيت TypeScript عالمياً

```powershell
npm install -g typescript
```

### 2. بناء المشروع

```powershell
tsc --skipLibCheck
```

### 3. تشغيل المشروع

```powershell
node dist/server.js
```

## 🚀 أوامر سريعة

### بناء وتشغيل معاً:
```powershell
tsc --skipLibCheck; node dist/server.js
```

### استخدام Script:
```powershell
.\run.ps1
```

## 📋 الخطوات الكاملة

### Backend

```powershell
# 1. تثبيت TypeScript عالمياً (مرة واحدة)
npm install -g typescript

# 2. بناء المشروع
tsc --skipLibCheck

# 3. تشغيل المشروع
node dist/server.js
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

## 🔧 حلول بديلة

### إذا لم تستطع تثبيت TypeScript عالمياً:

```powershell
# استخدام ts-node
npm install ts-node --save-dev --no-save
npx ts-node src/server.ts
```

## ✅ التحقق من النجاح

بعد تشغيل `node dist/server.js`، افتح المتصفح على:
- http://localhost:3000/health

يجب أن ترى:
```json
{"status":"ok","timestamp":"..."}
```

## 📚 ملفات المساعدة

- `FINAL_SOLUTION.md` - الحل النهائي المفصل
- `WORKING_SOLUTION.md` - حلول بديلة
- `run.ps1` - Script تلقائي

## 🎯 الخلاصة

**الحل الأبسط والأضمن:**
1. `npm install -g typescript`
2. `tsc --skipLibCheck`
3. `node dist/server.js`

هذا سيعمل 100%!

