import { Button, PrivateLayout } from '@/components';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
export const metadata = {
  title: 'MyPocket - Accounts',
};
interface AccountLayoutProps {
  children: ReactNode;
}
export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <PrivateLayout
      title="Accounts"
      extra={
        <Link href="/private/account/new">
          <Button icon={<FaPlus />}>New Account</Button>
        </Link>
      }
    >
      {children}
    </PrivateLayout>
  );
}
