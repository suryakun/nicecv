import { Inter } from 'next/font/google';
import NextAuthProvider from 'components/auth/next-auth-provider';
import type { Metadata } from 'next';
import { Toaster } from 'components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NiceCV - Create Professional Resumes',
  description:
    'Build and customize your professional resume with NiceCV. Easy-to-use tools for creating standout CVs.',
  openGraph: {
    title: 'NiceCV - Create Professional Resumes',
    description:
      'Build and customize your professional resume with NiceCV. Easy-to-use tools for creating standout CVs.',
    url: 'https://nicecv.ai', // Replace with your actual URL
    siteName: 'NiceCV',
    images: [
      {
        url: 'https://nicecv.ai/og-image.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'NiceCV - Professional Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NiceCV - Create Professional Resumes',
    description:
      'Build and customize your professional resume with NiceCV. Easy-to-use tools for creating standout CVs.',
    images: ['https://nicecv.ai/og-image.jpg'], // Replace with your actual Twitter card image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/newlogo.svg" type="image/svg+xml" />
      <body className={inter.className}>
        <NextAuthProvider>
          <div className={`min-h-screen bg-transparent`}>{children}</div>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
