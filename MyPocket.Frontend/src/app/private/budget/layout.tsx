import { Button, PrivateLayout } from '@/components';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

interface BudgetLayoutProps {
  children: ReactNode;
}
export default function BudgetLayout({ children }: BudgetLayoutProps) {
  return (
    <PrivateLayout title="Budgets" extra={<Button icon={<FaPlus />}>New Budget</Button>}>
      {children}
    </PrivateLayout>
  );
}
