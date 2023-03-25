import 'styles/globals.scss';

export const metadata = {
  title: 'MyPocket.com',
  description: 'Personal Finances Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
