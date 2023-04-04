import { IAccount } from '@/types/account';
import { ApiRequest } from '@/types/apirequest';
import apiEndpoints from './apiEndpoints';
import { getSession } from './session';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;

export const getAccountById = async (id: string) => {
  try {
    const session = await getSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET_BY_ID.endpoint + `?id=${id}`, {
      method: apiEndpoints.ACCOUNT.GET_BY_ID.method,
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!res.ok) {
      //const text = await res.text();
      const result: ApiRequest<IAccount | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: null,
      };
      return result;
    }
    const data: IAccount[] = await res.json();
    const result: ApiRequest<IAccount | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data[0],
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
