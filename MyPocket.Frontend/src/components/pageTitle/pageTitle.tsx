'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './pageTitle.module.scss';
function PageTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  const router = useRouter();
  return (
    <div className={styles.pageTitle}>
      <div className={styles.title}>
        <div onClick={() => router.back()} className={styles.backButton}>
          <FaArrowLeft />
        </div>
        <div>{children}</div>
      </div>
      <div className={styles.extra}>{extra}</div>
    </div>
  );
}
export default PageTitle;
