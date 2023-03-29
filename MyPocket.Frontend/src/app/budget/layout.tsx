import { PageTitle } from 'components';
import { ReactNode } from 'react';
import styles from './page.module.scss';

interface BudgetLayoutProps {
  children: ReactNode;
}
export default function BudgetLayout({ children }: BudgetLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Budgets</PageTitle>
      {children}
    </div>
  );
}
