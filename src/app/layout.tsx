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
      <body>
        <EmotionRegistry>
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
