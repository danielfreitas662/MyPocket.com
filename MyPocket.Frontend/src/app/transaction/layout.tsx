import { PageTitle } from 'components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface TransactionLayoutProps {
  children: ReactNode;
}
export default function TransactionLayout({ children }: TransactionLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Transactions</PageTitle>
      {children}
    </div>
  );
}
