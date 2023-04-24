import { Button, PrivateLayout } from '@/components';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Budgets');
  return (
    <PrivateLayout
      title={t('title')}
      extra={
        <Link href="/private/budget/new">
          <Button icon={<FaPlus />}>{t('newBudget')}</Button>
        </Link>
      }
    >
      {children}
    </PrivateLayout>
  );
}
