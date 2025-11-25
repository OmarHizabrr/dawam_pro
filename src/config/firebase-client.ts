/**
 * إعدادات Firebase Client SDK
 * للاستخدام في الواجهة الأمامية (Frontend)
 * 
 * بيانات المشروع: dawam-alhikma
 */

export const firebaseClientConfig = {
  apiKey: "AIzaSyAw6FJ4QIREo7p0UrOtIUakPWonEszM6-k",
  authDomain: "dawam-alhikma.firebaseapp.com",
  projectId: "dawam-alhikma",
  storageBucket: "dawam-alhikma.firebasestorage.app",
  messagingSenderId: "1023101223750",
  appId: "1:1023101223750:web:7bacc9cae17b42e5799b47",
  measurementId: "G-N11JKENYJB"
};

/**
 * مثال على الاستخدام في الواجهة الأمامية:
 * 
 * import { initializeApp } from "firebase/app";
 * import { getFirestore } from "firebase/firestore";
 * import { getAuth } from "firebase/auth";
 * import { getAnalytics } from "firebase/analytics";
 * import { firebaseClientConfig } from "./config/firebase-client";
 * 
 * const app = initializeApp(firebaseClientConfig);
 * export const db = getFirestore(app);
 * export const auth = getAuth(app);
 * export const analytics = getAnalytics(app);
 */

/**
 * مثال على الاستخدام في الواجهة الأمامية:
 * 
 * import { initializeApp } from "firebase/app";
 * import { getFirestore } from "firebase/firestore";
 * import { getAuth } from "firebase/auth";
 * import { firebaseClientConfig } from "./config/firebase-client";
 * 
 * const app = initializeApp(firebaseClientConfig);
 * export const db = getFirestore(app);
 * export const auth = getAuth(app);
 */

