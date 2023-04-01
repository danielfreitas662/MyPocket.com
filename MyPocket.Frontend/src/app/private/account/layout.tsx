import { Button, PrivateLayout } from '@/components';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
interface AccountLayoutProps {
  children: ReactNode;
}
export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <PrivateLayout title="Accounts" extra={<Button icon={<FaPlus />}>New Account</Button>}>
      {children}
    </PrivateLayout>
  );
}
