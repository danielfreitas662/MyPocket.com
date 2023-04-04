export interface ITransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  accountId: string;
  account: string;
  categoryId: string;
  category: string;
}
