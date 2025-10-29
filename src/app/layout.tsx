import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/components/providers/ThemeProvider';
import './globals.css';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'web developer',
    'react developer',
    'next.js',
    'portfolio',
    'khalid alkhader',
    'software engineer',
    'full-stack developer',
  ],
  authors: [{ name: 'Khalid Al-Khader' }],
  creator: 'Khalid Al-Khader',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://khalid-alkhader.com',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Khalid Al-Khader Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
