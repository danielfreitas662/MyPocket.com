import { ApiRequest } from '@/types/apirequest';
import { IBudget, IBudgetItem } from '@/types/budget';
import apiEndpoints from '../apiEndpoints';
import { Filter, FilterResult } from '@/types/pagination';
import { AddOrUpdateResult } from '@/types/api';
import { getHeaders } from '../utils';
import { getCookie } from '@/utils/cookies';
import { APITranslations } from '../../../i18n';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
const localeCookieName: string = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string;

/**
 * Server side function
 */
export const getBudgets = async (filters: Filter<IBudget>, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.FILTER.endpoint, {
      method: apiEndpoints.BUDGET.FILTER.method,
      cache: 'no-store',
      headers: getHeaders(token, locale),
      body: JSON.stringify(filters),
    });
    if (!res.ok) {
      const result: ApiRequest<FilterResult<IBudget>> = {
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
    const data: FilterResult<IBudget> = await res.json();
    const result: ApiRequest<FilterResult<IBudget>> = {
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
export const getBudgetById = async (id: string, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.BUDGET.GET_BY_ID.method,
      cache: 'no-cache',
      headers: getHeaders(token, locale),
    });
    if (!res.ok) {
      const result: ApiRequest<IBudget | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: null,
      };
      return result;
    }
    const data: IBudget = await res.json();
    const result: ApiRequest<IBudget | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data,
    };
    return result;
  } catch (error: any) {
    const result: ApiRequest<IBudget | null> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: '',
      data: null,
    };
    return result;
  }
};
export const getBudgetByMonth = async (month: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.GET_BY_MONTH.endpoint + `/${month}`, {
      method: apiEndpoints.BUDGET.GET_BY_MONTH.method,
      cache: 'no-cache',
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<IBudget | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: null,
      };
      return result;
    }
    const data: IBudget = await res.json();
    const result: ApiRequest<IBudget | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data,
    };
    return result;
  } catch (error: any) {
    const result: ApiRequest<IBudget | null> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: '',
      data: null,
    };
    return result;
  }
};
export const saveBudget = async (budget: Partial<IBudget>) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.ADD.endpoint, {
      method: apiEndpoints.BUDGET.ADD.method,
      body: JSON.stringify(budget),
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<AddOrUpdateResult<IBudget> | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error'),
        data: null,
      };
      return result;
    }
    const data: AddOrUpdateResult<IBudget> = await res.json();
    const result: ApiRequest<AddOrUpdateResult<IBudget>> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('saved', { entity: t('budget') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeBudgetItem = async (id: string) => {
  const locale = getCookie(localeCookieName);
  const t = await APITranslations(locale, 'API');
  try {
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.REMOVE_ITEM.endpoint + `/${id}`, {
      method: apiEndpoints.BUDGET.REMOVE_ITEM.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<string | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error', { entity: t('budget') }),
        data: null,
      };
      return result;
    }
    const data: string = await res.json();
    const result: ApiRequest<string> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('removed', { entity: t('budget') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const updateBudgetItem = async (values: IBudgetItem) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.UPDATE_ITEM.endpoint, {
      method: apiEndpoints.BUDGET.UPDATE_ITEM.method,
      body: JSON.stringify(values),
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<IBudgetItem | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error'),
        data: null,
      };
      return result;
    }
    const data: IBudgetItem = await res.json();
    const result: ApiRequest<IBudgetItem> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('saved', { entity: t('budget') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const addBudgetItem = async (item: Partial<IBudgetItem>) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.ADD_ITEM.endpoint, {
      method: apiEndpoints.BUDGET.ADD_ITEM.method,
      body: JSON.stringify(item),
      headers: getHeaders(),
    });
    const data: string = await res.text();
    if (!res.ok) {
      const result: ApiRequest<string | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: data,
        data: null,
      };
      return result;
    }

    const result: ApiRequest<string | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('saved', { entity: t('budget') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeBudget = async (id: string) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.BUDGET.REMOVE.method,
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
      message: t('removed', { entity: t('budget') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
