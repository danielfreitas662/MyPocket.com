import { ITransaction } from './transaction';

export interface ICategory {
  id: string;
  name: string;
  type: CategoryType;
  budgets: string;
  transactions: ITransaction[];
}

export enum CategoryType {
  Income = 0,
  Expense = 1,
}
