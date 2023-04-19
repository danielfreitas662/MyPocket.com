import { IAccount } from '@/types/account';
import { ApiRequest } from '@/types/apirequest';
import apiEndpoints from './apiEndpoints';
import { getClientSession } from './clientSession';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;

export const getAccountById = async (id: string, session: string | undefined) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.ACCOUNT.GET_BY_ID.method,
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    if (!res.ok) {
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
    const result: ApiRequest<IAccount | null> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: '',
      data: null,
    };
    return result;
  }
};
export const getAccounts = async (session: string | undefined) => {
  try {
    const token = session || (await getClientSession());
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET.endpoint, {
      method: apiEndpoints.ACCOUNT.GET.method,
      headers: {
        Authorization: `Bearer ${token}`,
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
    const result: ApiRequest<IAccount[]> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: '',
      data: [],
    };
    return result;
  }
};
