'use client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styles from './table.module.scss';
import Pagination, { PaginationProps } from '../pagination/pagination';
import { RecordType, Sorter, TableProps } from './tableTypes';
import { TableContext } from './ tableContext';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

function Table({
  dataSource = [],
  columns,
  loading,
  sorter,
  scroll,
  rowKey,
  pagination: { total, current = 1, pageOptions = [10, 20, 50], pageSize = 2 },
  onChange = () => null,
}: TableProps) {
  const [currentSorter, setCurrentSorter] = useState<Sorter>(sorter || { order: null, field: null });
  const [currentPagination, setCurrentPagination] = useState<Omit<PaginationProps, 'total' | 'setCurrentPagination'>>({
    current: current,
    pageOptions: pageOptions,
    pageSize: pageSize,
  });
  const [data, setData] = useState<RecordType[]>(dataSource);
  const [filterValue, setFilterValue] = useState<RecordType>(
    columns.reduce((a, b) => ({ ...a, [b.dataIndex]: b.filter?.filterValue }), {})
  );
  useEffect(() => {
    setFilterValue(columns.reduce((a, b) => ({ ...a, [b.dataIndex]: b.filter?.filterValue }), {}));
  }, []);
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
            dataSource: data,
            columns,
            rowKey,
            onChange,
            currentSorter,
            setCurrentSorter,
            currentPagination,
            filter: filterValue,
            setFilter: setFilterValue,
          }}
        >
          <table>
            <TableHeader />
            <TableBody />
          </table>
        </TableContext.Provider>
      </div>
      <Pagination
        {...currentPagination}
        total={total}
        setCurrentPagination={setCurrentPagination}
        onChange={(pagination) => onChange && onChange(filterValue, currentSorter, pagination)}
      />
    </div>
  );
}

export default Table;
