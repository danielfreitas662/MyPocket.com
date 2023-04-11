import { CSSProperties, ReactNode } from 'react';
import styles from './card.module.scss';
import clsx from 'clsx';
interface CardProps {
  children: ReactNode;
  title: string;
  style?: CSSProperties;
  align?: 'center' | 'right' | 'left';
}
function Card({ children, title, style, align = 'right' }: CardProps) {
  return (
    <div className={styles.card} style={style}>
      <div className={styles.title}>{title}</div>
      <hr />
      <div
        className={clsx({
          [styles.body]: true,
          [styles.alignCenter]: align === 'center',
          [styles.alignLeft]: align === 'left',
          [styles.alignRight]: align === 'right',
        })}
      >
        {children}
      </div>
    </div>
  );
}
export default Card;
