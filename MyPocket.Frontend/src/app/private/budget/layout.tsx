import { Button, PrivateLayout } from '@/components';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

export const metadata = {
  title: 'MyPocket - Layout',
};
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
