import { ApiRequest } from '@/types/apirequest';
import { ITransaction } from '@/types/transaction';
import { Filter, FilterResult } from '@/types/pagination';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getTransactions = async (filters: Filter<ITransaction>) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.FILTER.endpoint, {
      method: apiEndpoints.TRANSACTION.FILTER.method,
      cache: 'no-store',
      body: JSON.stringify(filters),
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.token}`,
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      const result: ApiRequest<FilterResult<ITransaction>> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: {
          results: [],
          total: 0,
          current: 1,
        },
      };
      return result;
    }
    const data: FilterResult<ITransaction> = await res.json();
    const result: ApiRequest<FilterResult<ITransaction>> = {
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
export const saveTransaction = async (transaction: Partial<ITransaction>) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.ADD.endpoint, {
      method: apiEndpoints.TRANSACTION.ADD.method,
      body: JSON.stringify(transaction),
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<ITransaction | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: 'Something wrong happened',
        data: null,
      };
      return result;
    }
    const data: ITransaction = await res.json();
    const result: ApiRequest<ITransaction | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: 'Transaction successfully saved',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeTransaction = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.TRANSACTION.REMOVE.method,
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<string | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: 'Something wrong happened',
        data: null,
      };
      return result;
    }
    const data = await res.text();
    const result: ApiRequest<string | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: 'Transaction successfully removed',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
