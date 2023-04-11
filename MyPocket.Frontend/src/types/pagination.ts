export interface Filter<T> {
  filters?: T;
  sorter?: Sorter;
  pagination?: Pagination;
}

export interface Pagination {
  current: number;
  pageSize: number;
}
export interface Sorter {
  field: string;
  order: 'asc' | 'desc';
}
export interface FilterResult<T> {
  results: T[];
  total: number;
  current: number;
}

export interface PageSearchParams {
  current: number;
  pageSize: number;
  field: string;
  order: 'asc' | 'desc';
}
