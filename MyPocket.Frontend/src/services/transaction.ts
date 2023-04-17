import { ApiRequest } from '@/types/apirequest';
import { ITransaction } from '@/types/transaction';
import apiEndpoints from './apiEndpoints';
import { getSession } from './session';
import { getClientSession } from './clientSession';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getTransactions = async () => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.GET.endpoint, {
      method: apiEndpoints.TRANSACTION.GET.method,
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    if (!res.ok) {
      //const text = await res.text();
      const result: ApiRequest<ITransaction[]> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: [],
      };
      return result;
    }
    const data: ITransaction[] = await res.json();
    const result: ApiRequest<ITransaction[]> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const getTransactionById = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.TRANSACTION.GET_BY_ID.method,
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    if (!res.ok) {
      //const text = await res.text();
      const result: ApiRequest<ITransaction | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: null,
      };
      return result;
    }
    const data: ITransaction = await res.json();
    const result: ApiRequest<ITransaction | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
