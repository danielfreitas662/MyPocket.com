import { Button, PrivateLayout } from '@/components';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
interface AccountLayoutProps {
  children: ReactNode;
  params: {
    month: string;
  };
}
export default function AccountLayout({ children, params }: AccountLayoutProps) {
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
