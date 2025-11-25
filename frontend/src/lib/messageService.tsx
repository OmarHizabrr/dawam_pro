'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export type MessageType = 'success' | 'error' | 'warning' | 'info';
export type ConfirmType = 'danger' | 'warning' | 'info';

interface MessageContextType {
  showMessage: (message: string, type: MessageType) => void;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string,
    type?: ConfirmType
  ) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within MessageProvider');
  }
  return context;
}

interface MessageProviderProps {
  children: ReactNode;
}

interface ToastMessage {
  id: string;
  message: string;
  type: MessageType;
}

interface ConfirmDialog {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText: string;
  cancelText: string;
  type: ConfirmType;
}

export function MessageProvider({ children }: MessageProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog | null>(null);

  const showMessage = (message: string, type: MessageType) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText = 'تأكيد',
    cancelText = 'إلغاء',
    type: ConfirmType = 'info'
  ) => {
    setConfirmDialog({
      message,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      type,
    });
  };

  const handleConfirm = () => {
    if (confirmDialog) {
      confirmDialog.onConfirm();
      setConfirmDialog(null);
    }
  };

  const handleCancel = () => {
    if (confirmDialog?.onCancel) {
      confirmDialog.onCancel();
    }
    setConfirmDialog(null);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getToastColor = (type: MessageType) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
    }
  };

  const getConfirmColor = (type: ConfirmType) => {
    switch (type) {
      case 'danger': return 'bg-red-600';
      case 'warning': return 'bg-yellow-600';
      case 'info': return 'bg-blue-600';
    }
  };

  return (
    <MessageContext.Provider value={{ showMessage, showConfirm }}>
      {children}
      
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getToastColor(toast.type)} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in-right`}
          >
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {confirmDialog.type === 'danger' ? 'تأكيد الحذف' :
                 confirmDialog.type === 'warning' ? 'تأكيد الإجراء' :
                 'تأكيد'}
              </h2>
              <p className="text-gray-700 mb-4">{confirmDialog.message}</p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-all"
                >
                  {confirmDialog.cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-6 py-2.5 text-white rounded-lg font-medium transition-all ${getConfirmColor(confirmDialog.type)} hover:opacity-90`}
                >
                  {confirmDialog.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MessageContext.Provider>
  );
}

