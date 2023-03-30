import { PageTitle } from '@/components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface ProfileLayoutProps {
  children: ReactNode;
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Profile</PageTitle>
      {children}
    </div>
  );
}
