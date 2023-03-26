import { Navbar } from 'components';
import Link from 'next/link';
import 'styles/globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyPocket.com',
  description: 'Personal Finances Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <main className="main">
          <div className="logo">
            <Link href="/">
              <span>MyPocket.com</span>
            </Link>
          </div>
          <Navbar style={{ ...inter.style }} />
          <div style={{ ...inter.style }} className={inter.className}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
