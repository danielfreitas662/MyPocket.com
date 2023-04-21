import React, { CSSProperties, ReactNode } from 'react';

export interface TableSummaryProps {
  children: ReactNode;
  fixed?: boolean;
}

function Summary({ children, fixed = false }: TableSummaryProps) {
  return <tfoot>{children}</tfoot>;
}

export interface SummaryProps {}
export interface SummaryRowProps {
  children: ReactNode;
  style?: CSSProperties;
}
export interface SummaryCellProps {
  style?: CSSProperties;
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
}

function SummaryRow({ children, style }: SummaryRowProps) {
  return <tr style={style}>{children}</tr>;
}
function SummaryCell({ children, rowSpan, colSpan, style, align = 'left' }: SummaryCellProps) {
  return (
    <td rowSpan={rowSpan} colSpan={colSpan} align={align} style={style}>
      {children}
    </td>
  );
}

Summary.Row = SummaryRow;
Summary.Cell = SummaryCell;

export default Summary;
