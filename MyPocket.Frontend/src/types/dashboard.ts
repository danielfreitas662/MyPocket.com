export interface AmountByCategory {
  category: string;
  amount: number;
}
export interface TransactionsByMonth {
  date: string;
  amount: number;
}
export interface ResultsByMonth {
  date: string;
  income: number;
  expense: number;
  result: number;
}
