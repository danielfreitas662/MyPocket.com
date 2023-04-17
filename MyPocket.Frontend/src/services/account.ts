import { IAccount } from '@/types/account';
import { ApiRequest } from '@/types/apirequest';
import apiEndpoints from './apiEndpoints';
import { getSession } from './session';
import { getClientSession } from './clientSession';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;

export const getAccountById = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.ACCOUNT.GET_BY_ID.method,
      headers: {
        Authorization: `Bearer ${session}`,
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
    const data: IAccount = await res.json();
    const result: ApiRequest<IAccount | null> = {
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
export const getAccounts = async () => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET.endpoint, {
      method: apiEndpoints.ACCOUNT.GET.method,
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    if (!res.ok) {
      //const text = await res.text();
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
