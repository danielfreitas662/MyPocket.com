import { ApiRequest } from '@/types/apirequest';
import { IAccount } from '@/types/account';
import apiEndpoints from '../apiEndpoints';
import { Filter, FilterResult } from '@/types/pagination';
import { getCookie } from '@/utils/cookies';
import { APITranslations } from '../../../i18n';
import { getHeaders } from '../utils';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
const localeCookieName: string = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string;

/**
 * Server side function
 */
export const getAllAccounts = async (token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET.endpoint, {
      method: apiEndpoints.ACCOUNT.GET.method,
      headers: getHeaders(token, locale),
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
/**
 * Server side function
 */
export const getAccounts = async (filters: Filter<IAccount>, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.FILTER.endpoint, {
      method: apiEndpoints.ACCOUNT.FILTER.method,
      cache: 'no-store',
      headers: getHeaders(token, locale),
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
/**
 * Server side function
 */
export const getAccountById = async (id: string, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.ACCOUNT.GET_BY_ID.method,
      headers: getHeaders(token, locale),
    });
    if (!res.ok) {
      const text = await res.text();
      const result: ApiRequest<IAccount | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: text,
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

export const saveAccount = async (account: Partial<IAccount>) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.ADD.endpoint, {
      method: apiEndpoints.ACCOUNT.ADD.method,
      body: JSON.stringify(account),
      headers: getHeaders(),
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
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.ACCOUNT.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.ACCOUNT.REMOVE.method,
      headers: getHeaders(),
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
