import { ApiRequest } from '@/types/apirequest';
import { CategoryType } from '@/types/category';
import { AmountByCategory, CategoryExpenses, ResultsByMonth, TransactionsByMonth } from '@/types/dashboard';
import apiEndpoints from '../apiEndpoints';
import { getClientLocale, getClientSession, getHeaders } from '../utils';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getAmountByCategory = async (month: string, type: CategoryType) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.AMOUNT_BY_CATEGORY.endpoint + `/${month}/${type}`, {
      method: apiEndpoints.DASHBOARD.AMOUNT_BY_CATEGORY.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<AmountByCategory[] | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: null,
      };
      return result;
    }
    const data: AmountByCategory[] = await res.json();
    const result: ApiRequest<AmountByCategory[] | null> = {
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
export const getIncomeByMonth = async (month: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.INCOME_BY_MONTH.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.INCOME_BY_MONTH.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<number> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: 0,
      };
      return result;
    }
    const data: number = await res.json();
    const result: ApiRequest<number> = {
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
export const getExpensesByMonth = async (month: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.EXPENSES_BY_MONTH.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.EXPENSES_BY_MONTH.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<number> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: 0,
      };
      return result;
    }
    const data: number = await res.json();
    const result: ApiRequest<number> = {
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
export const getTransactionsByMonth = async (month: string, type: CategoryType) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.TRANSACTIONS_BY_MONTH.endpoint + `/${month}/${type}`, {
      method: apiEndpoints.DASHBOARD.TRANSACTIONS_BY_MONTH.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<TransactionsByMonth[]> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: [],
      };
      return result;
    }
    const data: TransactionsByMonth[] = await res.json();
    const result: ApiRequest<TransactionsByMonth[]> = {
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
export const getResultsByMonth = async (month: string) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.RESULTS_BY_MONTH.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.RESULTS_BY_MONTH.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<ResultsByMonth[]> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: [],
      };
      return result;
    }
    const data: ResultsByMonth[] = await res.json();
    const result: ApiRequest<ResultsByMonth[]> = {
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
export const getCategoryExpenses = async (month: string) => {
  try {
    const token = getClientSession();
    const locale = getClientLocale();
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.CATEGORY_EXPENSES.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.CATEGORY_EXPENSES.method,
      headers: getHeaders(),
    });
    if (!res.ok) {
      const result: ApiRequest<CategoryExpenses[]> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: '',
        data: [],
      };
      return result;
    }
    const data: CategoryExpenses[] = await res.json();
    const result: ApiRequest<CategoryExpenses[]> = {
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
