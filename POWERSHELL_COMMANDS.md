# أوامر PowerShell

## ⚠️ ملاحظة مهمة

في PowerShell، استخدم `;` بدلاً من `&&` لفصل الأوامر.

## الأوامر الصحيحة لـ PowerShell

### تشغيل Backend
```powershell
npm run dev
```

أو إذا كان tsx لا يعمل:
```powershell
node --loader tsx/esm src/server.ts
```

### بناء المشروع
```powershell
npx tsc
```

### تشغيل Frontend
```powershell
cd frontend
npm run dev
```

أو في سطر واحد:
```powershell
cd frontend; npm run dev
```

### تثبيت التبعيات
```powershell
npm install
```

### تثبيت Backend و Frontend
```powershell
npm install
cd frontend
npm install
```

## حل مشكلة tsx

إذا كان `tsx` لا يعمل، يمكنك:

### الحل 1: استخدام node مباشرة
```powershell
node --loader tsx/esm src/server.ts
```

### الحل 2: تثبيت ts-node
```powershell
npm install ts-node --save-dev
```

ثم استخدم:
```powershell
npx ts-node src/server.ts
```

### الحل 3: بناء المشروع أولاً
```powershell
npx tsc
node dist/server.js
```

## حل مشكلة TypeScript

إذا كان `npx tsc` لا يعمل:

### استخدام TypeScript المثبت عالمياً
```powershell
tsc
```

### أو تثبيت TypeScript محلياً
```powershell
npm install typescript --save-dev --legacy-peer-deps
```

## أوامر مفيدة

### التحقق من الحزم المثبتة
```powershell
npm list tsx typescript
```

### تنظيف node_modules
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### التحقق من الأخطاء
```powershell
npx tsc --noEmit
```

