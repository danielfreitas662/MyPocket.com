import { ApiRequest } from '@/types/apirequest';
import { ICategory } from '@/types/category';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const saveCategory = async (category: Partial<ICategory>) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.CATEGORY.ADD.endpoint, {
      method: apiEndpoints.CATEGORY.ADD.method,
      body: JSON.stringify(category),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
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
