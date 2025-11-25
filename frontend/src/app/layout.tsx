import { MessageProvider } from '@/lib/messageService';
import './globals.css';

export const metadata = {
  title: 'نظام إدارة الحضور والرواتب',
  description: 'نظام شامل لإدارة حضور الموظفين وإجازاتهم ورواتبهم',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <MessageProvider>
          {children}
        </MessageProvider>
      </body>
    </html>
  );
}

