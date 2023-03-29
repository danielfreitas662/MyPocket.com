import { Navbar } from 'components';
import Link from 'next/link';
import 'styles/globals.scss';
import { Inter } from 'next/font/google';
import { UserProvider } from 'context/userContext';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyPocket.com',
  description: 'Personal Finances Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
