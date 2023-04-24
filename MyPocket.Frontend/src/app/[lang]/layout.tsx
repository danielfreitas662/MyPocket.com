import Link from 'next/link';
import '../../styles/globals.scss';
import { Inter } from 'next/font/google';
import Footer from './footer';
import { Navbar } from '@/components';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/components/contexts/userContext';
import React from 'react';
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { getUser } from '@/services/api/user';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'My Pocket',
  description: 'Personal Finances Management',
  icons: { icon: [{ url: '/favicon.ico', type: 'image/svg+xml' }] },
};
const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const session = cookies().get('session')?.value;
  const user = await getUser(session);
  const locale = useLocale();

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  if (params.lang !== locale) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <UserProvider>
            <main className={inter.className + ' main'} style={{ ...inter.style }}>
              <header className="header">
                <div className="logo">
                  <Link href="/">
                    <span>MyPocket</span>
                  </Link>
                </div>
                <Navbar user={user} />
              </header>
              <div className="content">{children}</div>
              <Footer />
            </main>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
