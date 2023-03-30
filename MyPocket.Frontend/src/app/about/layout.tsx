import { PageTitle } from '@/components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface AboutLayoutProps {
  children: ReactNode;
}
export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>About Us</PageTitle>
      {children}
    </div>
  );
}
