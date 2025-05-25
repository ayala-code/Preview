'use client';

import { Geist } from 'next/font/google';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import theme from '../theme';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
            <Header />
      <main className={`${geistSans.variable} font-sans antialiased`}>
        <div
          style={{
            maxWidth: 1100,
            margin: '40px auto 32px auto',
            background: 'linear-gradient(135deg, #fffbe6 0%, #ffe082 30%, #ffb74d 60%, #a8e063 100%)',
            borderRadius: 24,
            boxShadow: '0 4px 32px 0 rgba(80,80,120,0.08)',
            padding: '40px 32px',
            minHeight: '60vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {children}
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

