'use client';
import clsx from 'clsx';
import React, { ReactNode, SetStateAction, useCallback, useState } from 'react';
import styles from './table.module.scss';

interface RecordType {
  [key: string]: any;
}

interface TableContextProps {
  dataSource: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
  onChange: (sorter: Sorter, pagination: Pagination) => void;
  sorter: Sorter;
  pagination: Pagination;
  setSorter: React.Dispatch<SetStateAction<Sorter>>;
  setPagination: React.Dispatch<SetStateAction<Pagination>>;
}
export const TableContext = React.createContext<TableContextProps>({} as TableContextProps);

export type CompareFn<T> = (a: T, b: T) => number;

export interface ColumnType<RecordType> {
  sorter?: CompareFn<Partial<RecordType>> | boolean;
  align?: 'left' | 'right' | 'center';
  title: string | ReactNode;
  dataIndex: string;
  width?: number | string;
  render?: (value: any, row: Partial<RecordType>, index: number) => any;
}
export interface Sorter {
  field: null | string;
  order: null | 'asc' | 'desc';
}
export interface Pagination {
  current: number;
  total: number;
  pageSize: number;
}
export interface TableProps {
  dataSource?: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
  onChange?: (sorter: Sorter, pagination: Pagination) => void;
}
function Table({ dataSource = [], columns, rowKey, onChange = () => null }: TableProps) {
  const [sorter, setSorter] = useState<Sorter>({ field: null, order: null });
  const [pagination, setPagination] = useState<Pagination>({ current: 1, total: 0, pageSize: 10 });
  return (
    <div className={styles.tableWrapper}>
      <TableContext.Provider
        value={{ dataSource, columns, rowKey, onChange, sorter, pagination, setSorter, setPagination }}
      >
        <table>
          <TableHeader />
          <TableBody />
        </table>
      </TableContext.Provider>
    </div>
  );
}

function TableHeader() {
  const { columns, onChange, setSorter, pagination, sorter } = React.useContext(TableContext);
  return (
    <thead>
      <tr>
        {columns.map((c, i) => (
          <th
            onClick={() => {
              const newSorter: () => Sorter = () => {
                if (sorter.field === c.dataIndex) {
                  if (sorter.order === 'asc') return { field: sorter.field, order: 'desc' };
                  else if (sorter.order === 'desc') return { field: null, order: null };
                  else return { field: c.dataIndex, order: 'asc' };
                } else {
                  return { field: c.dataIndex, order: 'asc' };
                }
              };
              setSorter(newSorter());
              onChange && onChange(newSorter(), pagination);
            }}
            key={i}
            style={{ width: c.width }}
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