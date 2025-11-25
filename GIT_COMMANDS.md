# أوامر Git الجاهزة

## 🚀 رفع المشروع على GitHub (أوامر جاهزة)

### الخطوة 1: تهيئة Git

```cmd
git init
```

### الخطوة 2: إضافة الملفات

```cmd
git add .
```

### الخطوة 3: إنشاء Commit

```cmd
git commit -m "Initial commit: نظام إدارة الحضور والرواتب"
```

### الخطوة 4: ربط مع GitHub

```cmd
# استبدل YOUR_USERNAME باسم المستخدم في GitHub
git remote add origin https://github.com/YOUR_USERNAME/dawam-pro.git
```

**مثال:**
```cmd
git remote add origin https://github.com/ahmed123/dawam-pro.git
```

### الخطوة 5: رفع المشروع

```cmd
git branch -M main
git push -u origin main
```

## 🔄 تحديث المشروع

```cmd
# إضافة التغييرات
git add .

# Commit
git commit -m "وصف التغييرات"

# رفع التغييرات
git push
```

## 📝 أوامر مفيدة

### عرض حالة المشروع
```cmd
git status
```

### عرض التغييرات
```cmd
git diff
```

### عرض التاريخ
```cmd
git log
```

### إلغاء التغييرات
```cmd
git checkout -- filename
```

## ⚠️ ملاحظات

- استخدم **Personal Access Token** ككلمة مرور (ليس كلمة المرور العادية)
- لا ترفع ملف `.env` على GitHub
- تأكد من وجود `.gitignore` قبل `git add .`

