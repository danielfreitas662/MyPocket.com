import { PageTitle } from 'components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface DasboardLayoutProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: DasboardLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Dasboard</PageTitle>
      {children}
    </div>
  );
}
