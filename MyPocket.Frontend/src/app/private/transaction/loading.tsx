import { Skeleton } from '@/components';
import styles from './page.module.scss';
export default function TransactionLoading() {
  return (
    <div className={styles.body}>
      <Skeleton rows={10} />
    </div>
  );
}
