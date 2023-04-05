import { CSSProperties, ReactNode } from 'react';
import styles from './card.module.scss';
interface CardProps {
  children: ReactNode;
  title: string;
  style: CSSProperties;
}
function Card({ children, title, style }: CardProps) {
  return (
    <div className={styles.card} style={style}>
      <div className={styles.title}>{title}</div>
      <hr />
      <div className={styles.body}>{children}</div>
    </div>
  );
}
export default Card;
