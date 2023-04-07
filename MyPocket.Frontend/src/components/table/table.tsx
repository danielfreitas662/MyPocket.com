'use client';
import clsx from 'clsx';
import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';
import styles from './table.module.scss';
import { FaDatabase } from 'react-icons/fa';
import Pagination, { PaginationProps } from '../pagination/pagination';

interface RecordType {
  [key: string]: any;
}

interface TableContextProps {
  dataSource: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
  onChange: (sorter: Sorter, pagination: PaginationProps) => void;
  sorter: Sorter;
  setSorter: React.Dispatch<SetStateAction<Sorter>>;
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
export interface TableProps {
  dataSource?: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
  scroll?: {
    x: number | string;
    y: number | string;
  };
  loading: boolean;
  onChange?: (sorter: Sorter, currentPagination: PaginationProps) => void;
  pagination: Partial<PaginationProps>;
}
function Table({
  dataSource = [],
  columns,
  loading,
  scroll,
  rowKey,
  pagination: { total, current = 1, pageOptions = [10, 20, 50], pageSize = 2 },
  onChange = () => null,
}: TableProps) {
  const [sorter, setSorter] = useState<Sorter>({ field: null, order: null });
  const [currentPagination, setCurrentPagination] = useState<Omit<PaginationProps, 'total' | 'setCurrentPagination'>>({
    current: current,
    pageOptions: pageOptions,
    pageSize: pageSize,
  });
  const [data, setData] = useState(dataSource);
  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  return (
    <div className={styles.all}>
      <div
        className={clsx({ [styles.tableWrapper]: true })}
        style={{ maxHeight: scroll?.y, maxWidth: scroll?.x, overflowY: 'scroll' }}
      >
        <div className={clsx({ [styles.spinnerMask]: true, [styles.loading]: loading })}>
          <div className={styles.spinner} />
        </div>
        <div className={clsx({ [styles.mask]: true, [styles.loading]: loading })}></div>
        <TableContext.Provider
          value={{
            dataSource: data
              .filter((_, index) => index >= ((currentPagination.current || 1) - 1) * (currentPagination.pageSize || 1))
              .filter((_, index) => index <= (currentPagination.pageSize || 1) - 1),
            columns,
            rowKey,
            onChange,
            sorter,
            setSorter,
          }}
        >
          <table>
            <TableHeader />
            <TableBody />
          </table>
        </TableContext.Provider>
      </div>
      <Pagination {...currentPagination} total={total} setCurrentPagination={setCurrentPagination} />
    </div>
  );
}

function TableHeader() {
  const { columns, onChange, setSorter, sorter } = React.useContext(TableContext);
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
              //onChange && onChange(newSorter(), currentPagination);
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
  console.log(dataSource.length);
  return (
    <tbody>
      {dataSource.length === 0 && (
        <tr>
          <td colSpan={columns.length}>
            <div className={styles.empty}>
              <div>
                <FaDatabase />
              </div>
              <div>No Data</div>
            </div>
          </td>
        </tr>
      )}
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
