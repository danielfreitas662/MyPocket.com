import { Skeleton } from '@/components';
import styles from './page.module.scss';
export default function ProfileLoading() {
  return (
    <div className={styles.body}>
      <Skeleton rows={10} />
    </div>
  );
}
