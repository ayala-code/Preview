"use client";

import ClientThemeProvider from './ClientThemeProvider';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <ClientThemeProvider>{children}</ClientThemeProvider>;
}
