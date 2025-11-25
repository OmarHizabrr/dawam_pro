# إعدادات Vercel الموصى بها

## 🔧 Backend (Node.js API)

### Project Settings:

```
Framework Preset: Other
Root Directory: . (فارغ)
Build Command: npm run build:backend:vercel
Output Directory: dist
Install Command: npm install
```

### Environment Variables:

```
FIREBASE_PROJECT_ID = dawam-alhikma
FIREBASE_CLIENT_EMAIL = your-service-account@dawam-alhikma.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PORT = 3000
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app
```

### Functions:

```
Runtime: Node.js 20.x
```

---

## 🎨 Frontend (Next.js)

### Project Settings:

```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build (تلقائي)
Output Directory: .next (تلقائي)
Install Command: npm install (تلقائي)
```

### Environment Variables:

```
NEXT_PUBLIC_API_URL = https://your-backend.vercel.app
```

---

## 📝 ملاحظات

1. **Root Directory:**
   - Backend: `.` (الجذر)
   - Frontend: `frontend`

2. **Build Command:**
   - Backend: `npm run build:backend:vercel`
   - Frontend: `npm run build` (تلقائي)

3. **Environment Variables:**
   - أضفها في Settings → Environment Variables
   - اختر: Production, Preview, Development

4. **Custom Domain:**
   - يمكنك إضافة domain مخصص في Settings → Domains

