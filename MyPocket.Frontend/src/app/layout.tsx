import Link from 'next/link';
import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import Footer from './footer';
import { Navbar } from '@/components';
import { getSession } from '@/services/session';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSession();
  return (
    <html lang="pt">
      <body>
        <main className={inter.className + ' main'} style={{ ...inter.style }}>
          <div className="header">
            <div className="logo">
              <Link href="/">
                <span>MyPocket.com</span>
              </Link>
            </div>
            <Navbar user={data?.user} />
          </div>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
