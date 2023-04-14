import { ChangePasswordModel } from '@/types/user';
import { getClientSession } from '../clientSession';
import apiEndpoints from '../apiEndpoints';
import { ApiRequest } from '@/types/apirequest';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const changePassword = async (values: ChangePasswordModel) => {
  try {
    const session = await getClientSession();
    const newLocal = apiAddress + apiEndpoints.USER.CHANGE_PASSWORD.endpoint;
    const res = await fetch(newLocal, {
      method: apiEndpoints.USER.CHANGE_PASSWORD.method,
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
        // @ts-ignore
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      const result: ApiRequest<string> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: text,
        data: text,
      };
      return result;
    }
    const data: string = await res.text();
    const result: ApiRequest<string> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: data,
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
