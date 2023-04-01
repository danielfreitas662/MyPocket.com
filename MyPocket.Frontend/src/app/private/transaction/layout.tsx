import { Button } from '@/components';
import PrivateLayout from '@/components/privateLayout/privateLayout';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
interface TransactionLayoutProps {
  children: ReactNode;
}
export default function TransactionLayout({ children }: TransactionLayoutProps) {
  return (
    <PrivateLayout title="Transactions" extra={<Button icon={<FaPlus />}>New Transaction</Button>}>
      {children}
    </PrivateLayout>
  );
}
