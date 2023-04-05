import moment from 'moment';

export interface ITransaction {
  id: string;
  description: string;
  amount: number;
  date: string | moment.Moment;
  accountId: string;
  account: string;
  categoryId: string;
  category: string;
}
