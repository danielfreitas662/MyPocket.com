import { ApiRequest } from '@/types/apirequest';
import { ICategory } from '@/types/category';
import apiEndpoints from './apiEndpoints';
import { getSession } from './session';
import { getClientSession } from './clientSession';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getCategories = async () => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.GET.endpoint, {
      method: apiEndpoints.CATEGORY.GET.method,
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${session}`,
      },
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
    throw new Error(JSON.stringify(error));
  }
};
export const getCategoryById = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.CATEGORY.GET_BY_ID.method,
      headers: {
        Authorization: `Bearer ${session}`,
      },
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
    throw new Error(JSON.stringify(error));
  }
};
