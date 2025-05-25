import type { Metadata } from 'next';
import './globals.css';
import EmotionRegistry from '@/theme/EmotionRegistry';
import ClientThemeProvider from '@/components/ClientThemeProvider';

export const metadata: Metadata = {
  title: 'פריויו – עיצוב פירות',
  description: 'מגשי פירות מעוצבים בהתאמה אישית. טרי, צבעוני, יוקרתי.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body style={{ background: 'linear-gradient(135deg, #fffbe6 0%, #ffe082 30%, #ffb74d 60%, #a8e063 100%)', minHeight: '100vh', margin: 0 }}>
        <EmotionRegistry>
          <div style={{
            maxWidth: 1200,
            margin: '32px auto',
            borderRadius: 24,
            boxShadow: '0 4px 32px 0 rgba(80,80,120,0.08)',
            background: 'white',
            padding: '32px 24px',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 0
          }}>
            <ClientThemeProvider>
              {children}
            </ClientThemeProvider>
          </div>
        </EmotionRegistry>
      </body>
    </html>
  );
}
