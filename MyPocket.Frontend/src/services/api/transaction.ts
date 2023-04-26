import { ApiRequest } from '@/types/apirequest';
import { ITransaction } from '@/types/transaction';
import { Filter, FilterResult } from '@/types/pagination';
import apiEndpoints from '../apiEndpoints';
import { getHeaders } from '../utils';
import { getCookie } from '@/utils/cookies';
import { APITranslations } from '../../../i18n';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
const localeCookieName: string = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string;

/**
 * Server side function
 */
export const getTransactions = async (filters: Filter<ITransaction>, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.FILTER.endpoint, {
      method: apiEndpoints.TRANSACTION.FILTER.method,
      cache: 'no-store',
      body: JSON.stringify(filters),
      headers: getHeaders(token, locale),
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
    const result: ApiRequest<FilterResult<ITransaction>> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: 'Something wrong happened',
      data: {
        results: [],
        total: 0,
        current: 1,
      },
    };
    return result;
  }
};
/**
 * Server side function
 */
export const getTransactionById = async (id: string, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.TRANSACTION.GET_BY_ID.method,
      headers: getHeaders(token, locale),
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
    const result: ApiRequest<ITransaction | null> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: '',
      data: null,
    };
    return result;
  }
};
export const saveTransaction = async (transaction: Partial<ITransaction>) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.ADD.endpoint, {
      method: apiEndpoints.TRANSACTION.ADD.method,
      body: JSON.stringify(transaction),
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<ITransaction | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error'),
        data: null,
      };
      return result;
    }
    const data: ITransaction = await res.json();
    const result: ApiRequest<ITransaction | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('saved', { entity: t('transaction') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeTransaction = async (id: string) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.TRANSACTION.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.TRANSACTION.REMOVE.method,
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
      message: t('removed', { entity: t('transaction') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
