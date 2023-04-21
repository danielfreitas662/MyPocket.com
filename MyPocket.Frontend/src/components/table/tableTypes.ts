import { ReactNode, SetStateAction } from 'react';
import { PaginationProps } from '../pagination/pagination';
import React from 'react';

export interface TableContextProps {
  dataSource: RecordType[];
  columns: ColumnType<RecordType>[];
  rowKey: string;
  filter: RecordType;
  setFilter: React.Dispatch<SetStateAction<RecordType>>;
  onChange: (
    filter: RecordType,
    sorter: Sorter,
    pagination: Omit<PaginationProps, 'total' | 'setCurrentPagination'>
  ) => void;
  currentSorter: Sorter;
  setCurrentSorter: React.Dispatch<SetStateAction<Sorter>>;
  currentPagination: Omit<PaginationProps, 'total' | 'setCurrentPagination'>;
}

export type RecordType = Record<string, any>;

/* interface RecordType{
  [key:  string]: any;
}
 */

export type CompareFn<T> = (a: T, b: T) => number;

export type FilterType = 'string' | 'date' | 'month' | 'number' | 'dateRange';
export interface TableFilterProps {
  /**'string' | 'date' | 'month' | 'number' | 'dateRange'**/
  filterType: FilterType;
  filterValue?: any;
}
export interface ColumnType<T extends RecordType> {
  sorter?: CompareFn<Partial<T>> | boolean;
  /**'left' | 'right' | 'center'**/
  align?: 'left' | 'right' | 'center';
  title: string | ReactNode;
  dataIndex: keyof T;
  width?: number | string;
  filter?: TableFilterProps;
  render?: (value: any, row: T, index: number) => any;
}
export interface Sorter {
  field: null | string;
  order: null | 'asc' | 'desc';
}
export interface TableProps {
  columns: ColumnType<any>[];
  dataSource?: RecordType[];
  rowKey: string;
  scroll?: {
    x: number | string;
    y: number | string;
  };
  sorter?: Sorter;
  loading?: boolean;
  onChange?: (
    filter: RecordType,
    sorter: Sorter,
    currentPagination: Omit<PaginationProps, 'total' | 'setCurrentPagination'>
  ) => void;
  pagination: Partial<PaginationProps> | false;
  summary?: (data: RecordType[]) => ReactNode;
}

export interface FilterProps {
  filterType: FilterType;
  setFilterValue: React.Dispatch<SetStateAction<any>>;
  column: string | null;
  dataIndex: string;
  setColumn: React.Dispatch<SetStateAction<null | string>>;
}
