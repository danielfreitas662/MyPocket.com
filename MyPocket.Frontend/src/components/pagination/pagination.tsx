'use client';
import clsx from 'clsx';
import React, { SetStateAction, useEffect, useState } from 'react';
import Select from '../inputComponents/select/select';
import styles from './pagination.module.scss';

export interface PaginationProps {
  current?: number;
  pageSize?: number;
  total?: number;
  pageOptions?: number[];
  setCurrentPagination: React.Dispatch<SetStateAction<Omit<PaginationProps, 'total' | 'setCurrentPagination'>>>;
}
function Pagination({
  current = 1,
  pageSize = 10,
  total = 0,
  pageOptions = [2, 10, 50],
  setCurrentPagination,
}: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    let tempPages: number[] = [];
    let pagesLenth = Math.ceil((total || 0) / (pageSize || 1));
    for (let i = 0; i < pagesLenth; i++) {
      tempPages.push(i + 1);
    }
    setPages(tempPages);
    if (tempPages.length < current) setCurrentPagination({ current: 1, pageSize, pageOptions });
  }, [total, pageSize]);
  return (
    <div className={styles.pagination}>
      {pages?.map((c) => (
        <div
          className={clsx({ [styles.pageButton]: true, [styles.active]: current === c })}
          key={c}
          onClick={() => setCurrentPagination({ pageSize, pageOptions, current: c })}
        >
          {c}
        </div>
      ))}
      {pages.length > 0 && (
        <Select
          value={pageSize}
          options={pageOptions.map((c) => ({ value: c, label: `${c} per page` }))}
          onChange={(e) => setCurrentPagination({ pageSize: e.target.value, pageOptions, current })}
        />
      )}
    </div>
  );
}
export default Pagination;
