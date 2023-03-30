import { PageTitle } from '@/components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface SignupLayoutProps {
  children: ReactNode;
}
export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Signup for free</PageTitle>
      {children}
    </div>
  );
}
