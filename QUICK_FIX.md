# حل سريع للمشاكل

## المشكلة الحالية

`tsx` و `typescript` غير مثبتين بشكل صحيح بسبب مشاكل في `esbuild`.

## الحل السريع

### الطريقة 1: استخدام TypeScript المثبت عالمياً

إذا كان TypeScript مثبتاً عالمياً:

```powershell
tsc --skipLibCheck
node dist/server.js
```

### الطريقة 2: إعادة تثبيت TypeScript

```powershell
npm uninstall typescript
npm install typescript@latest --save-dev --legacy-peer-deps
```

### الطريقة 3: استخدام ts-node بدلاً من tsx

```powershell
npm install ts-node --save-dev --legacy-peer-deps
```

ثم عدّل `package.json`:
```json
"dev": "ts-node src/server.ts"
```

### الطريقة 4: استخدام node مباشرة مع tsx

```powershell
node node_modules/tsx/dist/cli.cjs src/server.ts
```

## الحل الموصى به الآن

استخدم هذا الأمر مباشرة:

```powershell
node node_modules/tsx/dist/cli.cjs src/server.ts
```

أو إذا لم يعمل:

```powershell
# بناء المشروع باستخدام TypeScript المثبت عالمياً
tsc --skipLibCheck

# تشغيل المشروع
node dist/server.js
```

