# ⚡ نشر سريع - أوامر جاهزة

## 🚀 رفع على GitHub (أوامر جاهزة)

```cmd
# 1. تهيئة Git
git init

# 2. إضافة الملفات
git add .

# 3. Commit
git commit -m "Initial commit: نظام إدارة الحضور والرواتب"

# 4. ربط مع GitHub (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dawam-pro.git

# 5. رفع المشروع
git branch -M main
git push -u origin main
```

## 🌐 نشر على Vercel (خطوات سريعة)

1. **اذهب إلى:** [vercel.com](https://vercel.com)
2. **Sign Up** مع GitHub
3. **Add New Project**
4. **Import** المستودع `dawam-pro`
5. **إعدادات:**
   - Framework: `Other`
   - Build: `npm run build:backend`
   - Output: `dist`
6. **Environment Variables:** أضف متغيرات Firebase
7. **Deploy**

## 📝 ملاحظات

- لا ترفع `.env` على GitHub
- استخدم Environment Variables في Vercel
- Frontend و Backend يمكن نشرهما في مشروعين منفصلين

