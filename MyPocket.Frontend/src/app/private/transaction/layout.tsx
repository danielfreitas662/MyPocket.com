import { Button } from '@/components';
import PrivateLayout from '@/components/privateLayout/privateLayout';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
export const metadata = {
  title: 'MyPocket - Transactions',
};
interface TransactionLayoutProps {
  children: ReactNode;
}
export default function TransactionLayout({ children }: TransactionLayoutProps) {
  return (
    <PrivateLayout
      title="Transactions"
      extra={
        <Link href="/private/transaction/new">
          <Button icon={<FaPlus />}>New Transaction</Button>
        </Link>
      }
    >
      {children}
    </PrivateLayout>
  );
}
