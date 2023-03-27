import { ReactNode } from 'react';
import styles from './pageTitle.module.scss';
function PageTitle({ children }: { children: ReactNode }) {
  return <div className={styles.pageTitle}>{children}</div>;
}
export default PageTitle;
