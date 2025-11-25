import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

// إعدادات Firebase للمشروع
const FIREBASE_PROJECT_ID = 'dawam-alhikma';

// التحقق من وجود المتغيرات المطلوبة للـ Admin SDK
// ملاحظة: Admin SDK يحتاج Service Account credentials
if (!process.env.FIREBASE_CLIENT_EMAIL) {
  console.warn('⚠️  FIREBASE_CLIENT_EMAIL not found. Admin SDK may not work properly.');
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.warn('⚠️  FIREBASE_PRIVATE_KEY not found. Admin SDK may not work properly.');
}

// إعداد Firebase Admin SDK
// يمكن استخدام Service Account أو Application Default Credentials
let adminApp: admin.app.App;

if (!admin.apps.length) {
  try {
    // محاولة استخدام Service Account من متغيرات البيئة
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      const serviceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      };

      adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        projectId: FIREBASE_PROJECT_ID,
      });
    } else {
      // استخدام Application Default Credentials (للتطوير المحلي أو GCP)
      adminApp = admin.initializeApp({
        projectId: FIREBASE_PROJECT_ID,
      });
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error);
    throw error;
  }
} else {
  adminApp = admin.app();
}

export const db = adminApp.firestore();
export const auth = adminApp.auth();
export default adminApp;

