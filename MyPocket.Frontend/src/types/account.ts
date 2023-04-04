import { ITransaction } from './transaction';

export interface IAccount {
  id: string;
  name: string;
  transactions: ITransaction[];
}
