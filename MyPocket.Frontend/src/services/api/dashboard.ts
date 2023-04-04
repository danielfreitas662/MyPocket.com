import { ApiRequest } from '@/types/apirequest';
import { AmountByCategory } from '@/types/dashboard';
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
