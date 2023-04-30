import Link from 'next/link';
import '../../styles/globals.scss';
import { Inter } from 'next/font/google';
import Footer from './footer';
import { Navbar } from '@/components';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/components/contexts/userContext';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getUser } from '@/services/api/user';
import { cookies } from 'next/headers';
import LocaleSwitcher from '@/components/navbar/localeSwitcher';
import { defaultLocale } from '../../../i18n';

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
  const currentLocale = params.lang || defaultLocale;
  const session = cookies().get('session')?.value;
  const user = await getUser(session, currentLocale);
  const messages = (await import(`../../../messages/${currentLocale}.json`)).default;
  return (
    <html lang={currentLocale}>
      <body>
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <UserProvider>
            <main className={inter.className + ' main'} style={{ ...inter.style }}>
              <header className="header">
                <div className="logo">
                  <Link href="/">
                    <span>MyPocket</span>
                  </Link>
                </div>
                <LocaleSwitcher currentLocale={currentLocale} />
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
