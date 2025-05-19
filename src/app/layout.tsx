import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Using Geist Sans as per existing setup
import './globals.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import theme from '../theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'], // Geist supports Latin. For Hebrew, system fonts will be used or a specific Hebrew font could be added.
});

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
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
                  {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
