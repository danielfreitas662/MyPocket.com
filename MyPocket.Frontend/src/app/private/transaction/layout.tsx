import { Button } from '@/components';
import PrivateLayout from '@/components/privateLayout/privateLayout';
import { ReactNode } from 'react';
interface TransactionLayoutProps {
  children: ReactNode;
}
export default function TransactionLayout({ children }: TransactionLayoutProps) {
  return <PrivateLayout extra={<Button>New Transaction</Button>}>{children}</PrivateLayout>;
}
