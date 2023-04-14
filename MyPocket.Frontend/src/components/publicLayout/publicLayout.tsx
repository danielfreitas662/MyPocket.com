import { ReactNode } from 'react';
import PageTitle from '../pageTitle/pageTitle';
import styles from './publicLayout.module.scss';

function PublicLayout({ children, title, extra }: { children: ReactNode; title: string; extra?: ReactNode }) {
  return (
    <div className={styles.body}>
      <PageTitle extra={extra}>{title}</PageTitle>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
export default PublicLayout;
