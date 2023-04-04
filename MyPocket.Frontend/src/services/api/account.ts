import { ApiRequest } from '@/types/apirequest';
import { IAccount } from '@/types/account';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getAccounts = async () => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET.endpoint, {
      method: apiEndpoints.ACCOUNT.GET.method,
      cache: 'no-store',
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<IAccount[]> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: [],
      };
      return result;
    }
    const data: IAccount[] = await res.json();
    const result: ApiRequest<IAccount[]> = {
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
export const saveAccount = async (account: Partial<IAccount>) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.ADD.endpoint, {
      method: apiEndpoints.ACCOUNT.ADD.method,
      body: JSON.stringify(account),
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<IAccount | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: 'Something wrong happened',
        data: null,
      };
      return result;
    }
    const data: IAccount = await res.json();
    const result: ApiRequest<IAccount | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: 'Account successfully saved',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeAccount = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.ACCOUNT.REMOVE.method,
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
      message: 'Account successfully removed',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
