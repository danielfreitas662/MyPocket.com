import { Button, PrivateLayout } from '@/components';
import { ReactNode } from 'react';
interface AccountLayoutProps {
  children: ReactNode;
}
export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <PrivateLayout title="Accounts" extra={<Button>New Account</Button>}>
      {children}
    </PrivateLayout>
  );
}
