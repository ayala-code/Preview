import type {Metadata} from 'next';
import {Geist} from 'next/font/google'; // Using Geist Sans as per existing setup
import './globals.css';
import { CssBaseline, Container } from "@mui/material";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
            {children}
          </Container>
          <Footer />
        </div>
      </body>
    </html>
  );
}
