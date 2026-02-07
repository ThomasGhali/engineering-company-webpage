import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import { Theme } from '@radix-ui/themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://engineering-company-webpage-nwya.vercel.app'),
  title: {
    default: 'Qualtec | Engineering Company',
    template: '%s | Qualtec',
  },
  description: 'Modern engineering landing page with real-time projects dashboard.',
  keywords: ['Engineering', 'Qualtec', 'Dashboard', 'Next.js', 'Vercel', 'Thomas Ghali'],
  authors: [{ name: 'Thomas Ghali' }],
  openGraph: {
    title: 'Qualtec Engineering',
    description: 'Modern engineering landing page with real-time projects dashboard.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-100`}
      >
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
