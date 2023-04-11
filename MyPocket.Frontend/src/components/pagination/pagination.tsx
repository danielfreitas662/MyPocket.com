'use client';
import clsx from 'clsx';
import React, { SetStateAction, useEffect, useState } from 'react';
import { FaBackward, FaForward } from 'react-icons/fa';
import Select from '../inputComponents/select/select';
import styles from './pagination.module.scss';

export interface PaginationProps {
  current?: number;
  pageSize?: number;
  total?: number;
  pageOptions?: number[];
  setCurrentPagination: React.Dispatch<SetStateAction<Omit<PaginationProps, 'total' | 'setCurrentPagination'>>>;
  onChange?: (pagination: Omit<PaginationProps, 'total' | 'setCurrentPagination'>) => void;
}
function Pagination({
  current = 1,
  pageSize = 10,
  total = 0,
  pageOptions = [10, 20, 50],
  setCurrentPagination,
  onChange,
}: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]);
  const setCurrentPage = (page: number) => {
    setCurrentPagination({ pageSize, pageOptions, current: page });
    onChange && onChange({ current: page, pageSize, pageOptions });
  };
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
      <div className={styles.pages}>
        {pages.length > 5 && (
          <>
            <div
              className={clsx({ [styles.pageButton]: true, [styles.active]: current === 1 })}
              onClick={() => setCurrentPage(1)}
            >
              {1}
            </div>
            {current > 3 && (
              <div
                className={clsx({ [styles.pageButton]: true })}
                onClick={() => setCurrentPage(current - 5 < 1 ? 1 : current - 5)}
              >
                <FaBackward />
              </div>
            )}
            {pages
              .filter((c) => c > current - 3 && c < current + 3 && c < pages.length && c > 1)
              .map((c) => (
                <div
                  className={clsx({ [styles.pageButton]: true, [styles.active]: current === c })}
                  key={c}
                  onClick={() => setCurrentPage(c)}
                >
                  {c}
                </div>
              ))}
            {pages.length - 3 > current && (
              <div
                className={clsx({ [styles.pageButton]: true })}
                onClick={() => setCurrentPage(current + 5 > pages.length ? pages.length : current + 5)}
              >
                <FaForward />
              </div>
            )}
            <div
              className={clsx({ [styles.pageButton]: true, [styles.active]: current === pages.length })}
              onClick={() => setCurrentPage(pages.length)}
            >
              {pages.length}
            </div>
          </>
        )}
        {pages.length <= 5 &&
          pages?.map((c) => (
            <div
              className={clsx({ [styles.pageButton]: true, [styles.active]: current === c })}
              key={c}
              onClick={() => setCurrentPage(c)}
            >
              {c}
            </div>
          ))}
      </div>
      <div className={styles.pageSize}>
        {pages.length > 0 && (
          <Select
            value={pageSize}
            options={pageOptions.map((c) => ({ value: c, label: `${c} per page` }))}
            onChange={(e) => {
              setCurrentPagination({ pageSize: e.target.value, pageOptions, current });
              onChange && onChange({ pageOptions, pageSize: e.target.value, current });
            }}
          />
        )}
      </div>
      {total > 0 && <div className={styles.text}>{`Showing ${pageSize} of ${total} entries`}</div>}
    </div>
  );
}
export default Pagination;
