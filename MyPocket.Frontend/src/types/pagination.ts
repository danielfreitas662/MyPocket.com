export interface Filter<T> {
  filter?: T;
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
