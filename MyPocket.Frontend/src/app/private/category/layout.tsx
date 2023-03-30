import { PageTitle } from '@/components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface CategoryLayoutProps {
  children: ReactNode;
}
export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Categories</PageTitle>
      {children}
    </div>
  );
}
