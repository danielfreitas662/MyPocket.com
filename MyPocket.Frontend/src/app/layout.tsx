import Link from 'next/link';
import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import Footer from './footer';
import { Navbar } from '@/components';
import { getSession } from '@/services/api';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyPocket.com',
  description: 'Personal Finances Management',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSession();
  return (
    <html lang="pt">
      <body>
        <main className={inter.className + ' main'} style={{ ...inter.style }}>
          <div className="logo">
            <Link href="/">
              <span>MyPocket.com</span>
            </Link>
          </div>
          {/* @ts-ignore*/}
          <Navbar user={data?.user} />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
