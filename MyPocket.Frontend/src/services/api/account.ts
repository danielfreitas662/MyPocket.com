import { ApiRequest } from '@/types/apirequest';
import { IAccount } from '@/types/account';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
import { Filter, FilterResult } from '@/types/pagination';
import { useLocale, useTranslations } from 'next-intl';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getAccounts = async (filters: Filter<IAccount>, session: string | undefined) => {
  try {
    const token = session || (await getClientSession());

    const locale = useLocale();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.FILTER.endpoint, {
      method: apiEndpoints.ACCOUNT.FILTER.method,
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'Accept-Language': locale,
      },
      body: JSON.stringify(filters),
    });
    if (!res.ok) {
      const result: ApiRequest<FilterResult<IAccount>> = {
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
    const data: FilterResult<IAccount> = await res.json();
    const result: ApiRequest<FilterResult<IAccount>> = {
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
    const locale = useLocale();
    const t = useTranslations('API');
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.ADD.endpoint, {
      method: apiEndpoints.ACCOUNT.ADD.method,
      body: JSON.stringify(account),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session}`,
        'Accept-Language': locale,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<IAccount | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error'),
        data: null,
      };
      return result;
    }
    const data: IAccount = await res.json();
    const result: ApiRequest<IAccount | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('saved', { entity: 'Account' }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeAccount = async (id: string) => {
  try {
    const t = useTranslations('API');
    const locale = useLocale();
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.ACCOUNT.REMOVE.method,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session}`,
        'Accept-Language': locale,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<string | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error'),
        data: null,
      };
      return result;
    }
    const data = await res.text();
    const result: ApiRequest<string | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('removed'),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
