import { ReactNode } from 'react';
import styles from './pageTitle.module.scss';
function PageTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className={styles.pageTitle}>
      <div className={styles.title}>{children}</div>
      <div className={styles.extra}>{extra}</div>
    </div>
  );
}
export default PageTitle;
