import Link from 'next/link';
import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import Footer from './footer';
import { Navbar } from '@/components';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/components/contexts/userContext';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <UserProvider>
          <main className={inter.className + ' main'} style={{ ...inter.style }}>
            <div className="header">
              <div className="logo">
                <Link href="/">
                  <span>MyPocket</span>
                </Link>
              </div>
              <Navbar />
            </div>
            <div className="content">{children}</div>
            <Footer />
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
