import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bilingual Website',
  description: 'A bilingual website in Persian and English',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Navbar lang={params.lang} />
        <LanguageSwitcher />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}