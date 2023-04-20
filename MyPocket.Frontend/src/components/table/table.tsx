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
  loading = false,
  sorter,
  scroll,
  rowKey,
  pagination,
  onChange = () => null,
}: TableProps) {
  const [currentSorter, setCurrentSorter] = useState<Sorter>(sorter || { order: null, field: null });
  const [currentPagination, setCurrentPagination] = useState<Omit<PaginationProps, 'total' | 'setCurrentPagination'>>({
    current: pagination !== false ? pagination.current || 1 : 1,
    pageOptions: pagination !== false ? pagination.pageOptions || [10, 20, 50] : [10, 20, 50],
    pageSize: pagination !== false ? pagination.pageSize || 10 : 10,
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
        style={{ maxHeight: scroll?.y, width: '100%', overflow: 'scroll', overflowX: 'scroll' }}
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
          <table style={{ width: '100%', minWidth: scroll?.x, overflowX: 'scroll' }}>
            <TableHeader />
            <TableBody />
          </table>
        </TableContext.Provider>
      </div>
      {pagination !== false && (
        <Pagination
          {...currentPagination}
          total={pagination.total}
          pageData={dataSource}
          setCurrentPagination={setCurrentPagination}
          onChange={(pagination) => onChange && onChange(filterValue, currentSorter, pagination)}
        />
      )}
    </div>
  );
}

export default Table;
