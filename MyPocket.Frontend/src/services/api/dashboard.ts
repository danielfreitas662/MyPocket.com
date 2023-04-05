import { ApiRequest } from '@/types/apirequest';
import { CategoryType } from '@/types/category';
import { AmountByCategory, TransactionsByMonth } from '@/types/dashboard';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const getAmountByCategory = async (month: string) => {
  try {
    const session = await getClientSession();
    console.log(session);
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.AMOUNT_BY_CATEGORY.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.AMOUNT_BY_CATEGORY.method,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!res.ok) {
      //const text = await res.text();
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
    const session = await getClientSession();
    console.log(session);
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.INCOME_BY_MONTH.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.INCOME_BY_MONTH.method,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!res.ok) {
      //const text = await res.text();
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
export const getOutcomeByMonth = async (month: string) => {
  try {
    const session = await getClientSession();
    console.log(session);
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.OUTCOME_BY_MONTH.endpoint + `/${month}`, {
      method: apiEndpoints.DASHBOARD.OUTCOME_BY_MONTH.method,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.token}`,
      },
    });
    if (!res.ok) {
      //const text = await res.text();
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
    const session = await getClientSession();
    console.log(session);
    const res = await fetch(apiAddress + apiEndpoints.DASHBOARD.TRANSACTIONS_BY_MONTH.endpoint + `/${month}/${type}`, {
      method: apiEndpoints.DASHBOARD.TRANSACTIONS_BY_MONTH.method,
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.token}`,
      },
    });
    console.log(res);
    if (!res.ok) {
      //const text = await res.text();
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
