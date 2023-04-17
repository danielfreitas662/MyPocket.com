import { ApiRequest } from '@/types/apirequest';
import { ICategory } from '@/types/category';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
import { Filter, FilterResult } from '@/types/pagination';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getCategories = async (filters: Filter<ICategory>) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.FILTER.endpoint, {
      method: apiEndpoints.CATEGORY.FILTER.method,
      cache: 'no-store',
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session}`,
        'content-type': 'application/json',
      },
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
export const saveCategory = async (category: Partial<ICategory>) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.ADD.endpoint, {
      method: apiEndpoints.CATEGORY.ADD.method,
      body: JSON.stringify(category),
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session}`,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<ICategory | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: 'Something wrong happened',
        data: null,
      };
      return result;
    }
    const data: ICategory = await res.json();
    const result: ApiRequest<ICategory | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: 'Category successfully saved',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeCategory = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.CATEGORY.REMOVE.method,
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
      message: 'Category successfully removed',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
