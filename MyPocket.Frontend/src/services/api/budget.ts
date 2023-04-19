import { ApiRequest } from '@/types/apirequest';
import { IBudget } from '@/types/budget';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
import { Filter, FilterResult } from '@/types/pagination';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getBudgets = async (filters: Filter<IBudget>, session: string | undefined) => {
  try {
    const token = session || (await getClientSession());
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.FILTER.endpoint, {
      method: apiEndpoints.BUDGET.FILTER.method,
      cache: 'no-store',
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
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
export const getBudgetById = async (id: string, session: string | undefined) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.GET_BY_ID.endpoint + `/${id}`, {
      method: apiEndpoints.BUDGET.GET_BY_ID.method,
      headers: {
        Authorization: `Bearer ${session}`,
      },
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
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.ADD.endpoint, {
      method: apiEndpoints.BUDGET.ADD.method,
      body: JSON.stringify(budget),
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session}`,
      },
    });
    if (!res.ok) {
      const result: ApiRequest<IBudget | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: 'Something wrong happened',
        data: null,
      };
      return result;
    }
    const data: IBudget = await res.json();
    const result: ApiRequest<IBudget | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: 'Budget successfully saved',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
export const removeBudget = async (id: string) => {
  try {
    const session = await getClientSession();
    const res = await fetch(apiAddress + apiEndpoints.BUDGET.REMOVE.endpoint + `/${id}`, {
      method: apiEndpoints.BUDGET.REMOVE.method,
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session}`,
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
      message: 'Budget successfully removed',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
