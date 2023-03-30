import { Button, PrivateLayout } from '@/components';
import { ReactNode } from 'react';

interface BudgetLayoutProps {
  children: ReactNode;
}
export default function BudgetLayout({ children }: BudgetLayoutProps) {
  return (
    <PrivateLayout title="Budgets" extra={<Button>New Budget</Button>}>
      {children}
    </PrivateLayout>
  );
}
