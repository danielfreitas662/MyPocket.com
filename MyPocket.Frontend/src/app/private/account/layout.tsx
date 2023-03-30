import { PageTitle } from '@/components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface AccountLayoutProps {
  children: ReactNode;
}
export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Accounts</PageTitle>
      {children}
    </div>
  );
}
