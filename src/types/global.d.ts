/**
 * ملف تعريفات عامة
 * لحل مشاكل اكتشاف الحزم في VS Code
 */

/// <reference types="firebase-admin" />

declare namespace FirebaseFirestore {
  type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
  
  interface Query {
    where(fieldPath: string, opStr: WhereFilterOp, value: unknown): Query;
    limit(limit: number): Query;
    get(): Promise<QuerySnapshot>;
  }
  
  interface QuerySnapshot {
    docs: QueryDocumentSnapshot[];
  }
  
  interface QueryDocumentSnapshot {
    id: string;
    data(): Record<string, unknown>;
  }
  
  interface FieldValue {
    serverTimestamp(): any;
  }
  
  const FieldValue: {
    serverTimestamp(): any;
  };
}

