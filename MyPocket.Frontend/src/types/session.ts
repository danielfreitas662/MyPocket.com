import { IUser } from './user';

export interface Session {
  user: IUser;
  exp: number;
  token: string;
}
