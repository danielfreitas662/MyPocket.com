'use client';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styles from './table.module.scss';

interface RecordType {
  [key: string]: any;
}

interface TableContextProps {
  dataSource: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
}
export const TableContext = React.createContext<TableContextProps>({} as TableContextProps);

export type CompareFn<T> = (a: T, b: T) => number;

export interface ColumnType<RecordType> {
  sorter?: CompareFn<Partial<RecordType>> | boolean;
  align?: 'left' | 'right' | 'center';
  title: string | ReactNode;
  dataIndex: string;
  render?: (value: any, row: Partial<RecordType>, index: number) => any;
}
export interface TableProps {
  dataSource?: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
}
function Table({ dataSource = [], columns, rowKey }: TableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <TableContext.Provider value={{ dataSource, columns, rowKey }}>
          <TableHeader />
          <TableBody />
        </TableContext.Provider>
      </table>
    </div>
  );
}

function TableHeader() {
  const { columns } = React.useContext(TableContext);
  return (
    <thead>
      <tr>
        {columns.map((c, i) => (
          <th
            key={i}
            className={clsx({
              [styles.alignLeft]: c.align === 'left',
              [styles.alignRight]: c.align === 'right',
              [styles.alignCenter]: c.align === 'center',
            })}
          >
            {c.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
function TableBody() {
  const { columns, dataSource, rowKey } = React.useContext(TableContext);
  return (
    <tbody>
      {dataSource.map((row, rowIndex) => (
        <tr key={row[rowKey]}>
          {columns.map((col, colIndex) => (
            <td
              key={colIndex}
              className={clsx({
                [styles.alignLeft]: col.align === 'left',
                [styles.alignRight]: col.align === 'right',
                [styles.alignCenter]: col.align === 'center',
              })}
            >
              {(col.render && col.render(row[col.dataIndex], row, rowIndex)) || row[col.dataIndex]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Table;
