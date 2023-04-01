import Link from 'next/link';
import { ReactNode } from 'react';
import PageTitle from '../pageTitle/pageTitle';
import styles from './privateLayout.module.scss';

function PrivateLayout({ children, title, extra }: { children: ReactNode; title: string; extra?: ReactNode }) {
  return (
    <div className={styles.body}>
      <PageTitle extra={extra}>{title}</PageTitle>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
export default PrivateLayout;
