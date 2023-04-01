export interface ICategory {
  id: string;
  name: string;
  type: CategoryType;
  budgets: string;
  transactions: string;
}

export enum CategoryType {
  Income = 0,
  Outcome = 1,
}
