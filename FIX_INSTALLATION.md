# إصلاح مشاكل التثبيت

## المشكلة

`typescript` و `tsx` غير مثبتين بشكل صحيح بسبب مشاكل في `esbuild`.

## الحلول

### الحل 1: استخدام tsx مباشرة (الأسهل)

```powershell
node node_modules/tsx/dist/cli.cjs src/server.ts
```

### الحل 2: تثبيت ts-node

```powershell
npm install ts-node --save-dev --legacy-peer-deps
```

ثم استخدم:
```powershell
npx ts-node src/server.ts
```

### الحل 3: تثبيت TypeScript عالمياً

```powershell
npm install -g typescript
```

ثم استخدم:
```powershell
tsc --skipLibCheck
node dist/server.js
```

### الحل 4: حذف node_modules وإعادة التثبيت

**⚠️ تحذير:** أغلق VS Code وكل البرامج التي قد تستخدم الملفات أولاً.

```powershell
# في Command Prompt كمسؤول
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install --legacy-peer-deps
```

## الحل الموصى به الآن

استخدم هذا الأمر لتشغيل المشروع:

```powershell
node node_modules/tsx/dist/cli.cjs src/server.ts
```

أو أنشئ ملف `start.ps1`:

```powershell
node node_modules/tsx/dist/cli.cjs src/server.ts
```

ثم شغله:
```powershell
.\start.ps1
```

## للبناء

إذا أردت بناء المشروع:

```powershell
# تثبيت TypeScript عالمياً أولاً
npm install -g typescript

# ثم البناء
tsc --skipLibCheck

# التشغيل
node dist/server.js
```

