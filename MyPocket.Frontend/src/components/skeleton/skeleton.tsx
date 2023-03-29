import styles from './skeleton.module.scss';
interface SkeletonProps {
  rows: number;
}
export default function Skeleton({ rows }: SkeletonProps) {
  const rowsArray = new Array(rows).fill(0);

  return (
    <div className={styles.skeleton}>
      {rowsArray.map((_, i) => (
        <div key={i} style={{ width: `${100 * Math.random()}%` }} className={styles.line}></div>
      ))}
    </div>
  );
}
