export interface IBudget {
  id: string;
  month: string;
  amount?: number;
  items?: IBudgetItem[];
}
export interface IBudgetItem {
  id: string;
  category: string;
  categoryId: string;
  budgetId: string;
  amount: number;
  month: string;
}
