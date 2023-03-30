import { ReactNode } from 'react';
import styles from './descriptions.module.scss';
function Descriptions({ children }: { children: ReactNode }) {
  return <div className={styles.descriptions}>{children}</div>;
}

function DescriptionItem({ label, children }: { label: string; children: ReactNode | string }) {
  return (
    <div className={styles.item}>
      <div className={styles.labelContainer}>
        <div className={styles.label}>{label}</div>
      </div>
      <div className={styles.value}>{children}</div>
    </div>
  );
}
Descriptions.Item = DescriptionItem;

export default Descriptions;
