// @ts-ignore - firebase-admin types
import * as admin from 'firebase-admin';
import { db } from '../config/firebase';

/**
 * مستودع عام للتعامل مع Firestore
 * يتبع نفس نمط FirestoreApi من المشروع المرجعي
 */
export class FirestoreRepository {
  /**
   * الحصول على معرف جديد
   */
  getNewId(collectionName: string): string {
    return db.collection(collectionName).doc().id;
  }

  /**
   * الحصول على وثيقة واحدة
   */
  async getDocument<T>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> {
    const docRef = db.collection(collectionName).doc(documentId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as T;
  }

  /**
   * الحصول على جميع الوثائق من مجموعة
   */
  async getDocuments<T>(
    collectionName: string,
    filters?: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: unknown }>,
    limitCount?: number
  ): Promise<T[]> {
    let query: FirebaseFirestore.Query = db.collection(collectionName);

    if (filters) {
      filters.forEach((filter) => {
        query = query.where(filter.field, filter.operator, filter.value);
      });
    }

    if (limitCount) {
      query = query.limit(limitCount);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }

  /**
   * إنشاء أو تحديث وثيقة
   */
  async setDocument<T extends { id?: string; createdAt?: string; updatedAt?: string }>(
    collectionName: string,
    documentId: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const docRef = db.collection(collectionName).doc(documentId);
    const docSnap = await docRef.get();

    const isNew = !docSnap.exists;
    // @ts-ignore - firebase-admin FieldValue
    const now = admin.firestore.FieldValue.serverTimestamp();

    await docRef.set(
      {
        ...data,
        createdAt: isNew ? now : (docSnap.data()?.createdAt || now),
        updatedAt: now,
      },
      { merge: true }
    );
  }

  /**
   * تحديث وثيقة
   */
  async updateDocument(
    collectionName: string,
    documentId: string,
    data: Record<string, unknown>
  ): Promise<void> {
    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.update({
      ...data,
      updatedAt: FirebaseFirestore.FieldValue.serverTimestamp(),
    });
  }

  /**
   * حذف وثيقة
   */
  async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.delete();
  }

  /**
   * الحصول على وثائق من مجموعة فرعية
   */
  async getSubDocuments<T>(
    collectionName: string,
    documentId: string,
    subCollectionName: string,
    filters?: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: unknown }>,
    limitCount?: number
  ): Promise<T[]> {
    let query: FirebaseFirestore.Query = db
      .collection(collectionName)
      .doc(documentId)
      .collection(subCollectionName);

    if (filters) {
      filters.forEach((filter) => {
        query = query.where(filter.field, filter.operator, filter.value);
      });
    }

    if (limitCount) {
      query = query.limit(limitCount);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }

  /**
   * إنشاء أو تحديث وثيقة فرعية
   */
  async setSubDocument<T extends { id?: string; createdAt?: string; updatedAt?: string }>(
    collectionName: string,
    documentId: string,
    subCollectionName: string,
    subDocumentId: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const docRef = db
      .collection(collectionName)
      .doc(documentId)
      .collection(subCollectionName)
      .doc(subDocumentId);
    
    const docSnap = await docRef.get();
    const isNew = !docSnap.exists;
    const now = FirebaseFirestore.FieldValue.serverTimestamp();

    await docRef.set(
      {
        ...data,
        createdAt: isNew ? now : (docSnap.data()?.createdAt || now),
        updatedAt: now,
      },
      { merge: true }
    );
  }

  /**
   * حذف وثيقة فرعية
   */
  async deleteSubDocument(
    collectionName: string,
    documentId: string,
    subCollectionName: string,
    subDocumentId: string
  ): Promise<void> {
    const docRef = db
      .collection(collectionName)
      .doc(documentId)
      .collection(subCollectionName)
      .doc(subDocumentId);
    await docRef.delete();
  }
}

export const firestoreRepository = new FirestoreRepository();

