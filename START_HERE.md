# 🚀 ابدأ من هنا - دليل التشغيل السريع

## ⚠️ ملاحظة مهمة لـ PowerShell

في PowerShell، استخدم `;` بدلاً من `&&` لفصل الأوامر.

## الطريقة الموصى بها

### 1. بناء المشروع أولاً

```powershell
npx tsc --skipLibCheck
```

### 2. تشغيل Backend

```powershell
node dist/server.js
```

### 3. في نافذة PowerShell أخرى - تشغيل Frontend

```powershell
cd frontend
npm run dev
```

## أوامر سريعة

### بناء وتشغيل Backend
```powershell
npx tsc --skipLibCheck; node dist/server.js
```

### تشغيل Frontend
```powershell
cd frontend; npm run dev
```

## استخدام Scripts PowerShell

### تشغيل Backend
```powershell
.\run-dev.ps1
```

### تشغيل Frontend
```powershell
.\run-frontend.ps1
```

## حل مشكلة tsx

إذا كان `tsx` لا يعمل (وهو الحال حالياً):

1. **بناء المشروع:**
   ```powershell
   npx tsc --skipLibCheck
   ```

2. **تشغيل المشروع:**
   ```powershell
   node dist/server.js
   ```

3. **للتطوير مع إعادة التحميل التلقائي:**
   ```powershell
   node --watch dist/server.js
   ```

## التحقق من أن كل شيء يعمل

### 1. التحقق من البناء
```powershell
npx tsc --noEmit --skipLibCheck
```
يجب أن لا تظهر أخطاء.

### 2. التحقق من الخادم
بعد تشغيل `node dist/server.js`، يجب أن ترى:
```
🚀 Server is running on port 3000
📡 API available at http://localhost:3000/api/v1
🏥 Health check: http://localhost:3000/health
```

### 3. اختبار API
افتح المتصفح على: `http://localhost:3000/health`

يجب أن ترى:
```json
{"status":"ok","timestamp":"..."}
```

## استكشاف الأخطاء

### خطأ: "Cannot find module 'tsx'"
**الحل:** استخدم البناء المباشر:
```powershell
npx tsc --skipLibCheck
node dist/server.js
```

### خطأ: "Cannot find module '../lib/tsc.js'"
**الحل:** استخدم:
```powershell
npx tsc --skipLibCheck
```

### خطأ: "The token '&&' is not valid"
**الحل:** استخدم `;` بدلاً من `&&`:
```powershell
npx tsc; node dist/server.js
```

## الملفات المساعدة

- `POWERSHELL_COMMANDS.md` - جميع الأوامر لـ PowerShell
- `run-dev.ps1` - Script لتشغيل Backend
- `run-frontend.ps1` - Script لتشغيل Frontend

