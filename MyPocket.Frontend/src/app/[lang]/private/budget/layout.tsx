import { Button, PrivateLayout } from '@/components';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

export const metadata = {
  title: 'MyPocket - Budgets',
};
interface BudgetLayoutProps {
  children: ReactNode;
}
export default function BudgetLayout({ children }: BudgetLayoutProps) {
  return (
    <PrivateLayout
      title="Budgets"
      extra={
        <Link href="/private/budget/new">
          <Button icon={<FaPlus />}>New Budget</Button>
        </Link>
      }
    >
      {children}
    </PrivateLayout>
  );
}
