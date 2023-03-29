import { Navbar } from 'components';
import Link from 'next/link';
import 'styles/globals.scss';
import { Inter } from 'next/font/google';
import { UserProvider } from 'context/userContext';
import { Suspense, use } from 'react';
import apiEndpoints from 'services/apiEndpoints';
import { cookies } from 'next/headers';
import { IUser } from 'types/user';
import { getApiClient } from 'services/api';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyPocket.com',
  description: 'Personal Finances Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /*   const cookieHandler = cookies();
  const token = cookieHandler.get('token')?.value;
  const data = use(
    getApiClient(null)
      .get<IUser>(apiEndpoints.USER.GET_USER, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      })
  ); */
  return (
    <UserProvider>
      <html lang="pt">
        <body>
          <main className={inter.className + ' main'} style={{ ...inter.style }}>
            <div className="logo">
              <Link href="/">
                <span>MyPocket.com</span>
              </Link>
            </div>
            <Navbar style={{ ...inter.style }} />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </UserProvider>
  );
}
