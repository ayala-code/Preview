import type { Metadata } from 'next';
import './globals.css';
import EmotionRegistry from '@/theme/EmotionRegistry';
import ClientThemeProvider from '@/components/ClientThemeProvider';

export const metadata: Metadata = {
  title: 'פריוויו – עיצוב פירות',
  description: 'מגשי פירות מעוצבים בהתאמה אישית. טרי, צבעוני, יוקרתי.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className='min-h-screen bg-gradient-to-br from-fuchsia-100 via-pink-100 to-orange-100 text-gray-900'
    
      >
        <EmotionRegistry>
           <div 
             className="border-2 border-black"
           >
           <ClientThemeProvider>
              {children}
            </ClientThemeProvider> 
          </div>

        </EmotionRegistry>
      </body>
    </html>
  );
}