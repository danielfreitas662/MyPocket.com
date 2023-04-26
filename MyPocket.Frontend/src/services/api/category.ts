import { ApiRequest } from '@/types/apirequest';
import { ICategory } from '@/types/category';
import apiEndpoints from '../apiEndpoints';
import { Filter, FilterResult } from '@/types/pagination';
import { getHeaders } from '../utils';
import { getCookie } from '@/utils/cookies';
import { APITranslations } from '../../../i18n';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
const localeCookieName: string = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string;

/**
 * Server side function
 */
export const getAllCategories = async (token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.GET.endpoint, {
      method: apiEndpoints.CATEGORY.GET.method,
      cache: 'no-store',
      headers: getHeaders(token, locale),
    });
    if (!res.ok) {
      //const text = await res.text();
      const result: ApiRequest<ICategory[]> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: [],
      };
      return result;
    }
    const data: ICategory[] = await res.json();
    const result: ApiRequest<ICategory[]> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data,
    };
    return result;
  } catch (error: any) {
    const result: ApiRequest<ICategory[]> = {
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
export const getCategories = async (filters: Filter<ICategory>, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.FILTER.endpoint, {
      method: apiEndpoints.CATEGORY.FILTER.method,
      cache: 'no-store',
      headers: getHeaders(token, locale),
      body: JSON.stringify(filters),
    });
    if (!res.ok) {
      const result: ApiRequest<FilterResult<ICategory>> = {
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
    const data: FilterResult<ICategory> = await res.json();
    const result: ApiRequest<FilterResult<ICategory>> = {
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
export const getCategoryById = async (id: string, token: string | undefined, locale: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.CATEGORY.GET_BY_ID.method,
      headers: getHeaders(token, locale),
    });
    if (!res.ok) {
      //const text = await res.text();
      const result: ApiRequest<ICategory | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: null,
      };
      return result;
    }
    const data: ICategory = await res.json();
    const result: ApiRequest<ICategory | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: '',
      data: data,
    };
    return result;
  } catch (error: any) {
    const result: ApiRequest<ICategory | null> = {
      error: true,
      statusCode: 0,
      statusText: '',
      message: '',
      data: null,
    };
    return result;
  }
};

export const saveCategory = async (category: Partial<ICategory>) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.ADD.endpoint, {
      method: apiEndpoints.CATEGORY.ADD.method,
      body: JSON.stringify(category),
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<ICategory | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: t('error'),
        data: null,
      };
      return result;
    }
    const data: ICategory = await res.json();
    const result: ApiRequest<ICategory | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: t('saved', { entity: t('category') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeCategory = async (id: string) => {
  try {
    const locale = getCookie(localeCookieName);
    const t = await APITranslations(locale, 'API');
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.CATEGORY.REMOVE.method,
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
      message: t('removed', { entity: t('category') }),
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
