import { ReactNode } from 'react';
import styles from './row.module.scss';

interface RowProps {
  children: ReactNode;
  gutter?: number | number[];
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
  wrap?: boolean;
}
interface ColProps {
  children: ReactNode;
  flex?: string | number;
  span?: number;
}
function Row({ children, gutter, wrap = false, justifyContent = 'center' }: RowProps) {
  const gap = typeof gutter === 'object' ? `${gutter[0]}px ${gutter[1]}px` : `${gutter}px`;
  return (
    <div
      className={styles.row}
      style={{ gap: gap, justifyContent: justifyContent, flexWrap: wrap ? 'nowrap' : 'wrap' }}
    >
      {children}
    </div>
  );
}
function Col({ children, flex, span = 24 }: ColProps) {
  const width = 24 / span;
  return (
    <div className={styles.col} style={{ flex: flex || `1 1 ${width}%` }}>
      {children}
    </div>
  );
}
export { Row, Col };
