import { ChangePasswordModel, IUser, LoginModel, LoginResult } from '@/types/user';
import { getClientSession } from '../clientSession';
import apiEndpoints from '../apiEndpoints';
import { ApiRequest } from '@/types/apirequest';
import { setCookie } from '@/utils/cookies';

const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const authenticate = async (values: LoginModel) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.AUTHENTICATE.endpoint, {
      method: apiEndpoints.USER.AUTHENTICATE.method,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: LoginResult = await res.json();
    if (data?.token) {
      setCookie('session', data.token, 10);
    }
    return data;
  } catch (error) {
    const result: LoginResult = {
      success: false,
      message: 'Something wrong happened',
      token: '',
      user: null,
    };
    return result;
  }
};
export const getUser = async (session?: string) => {
  try {
    const token = session || (await getClientSession());
    const res = await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.GET_USER.endpoint, {
      method: apiEndpoints.USER.GET_USER.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data: IUser = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
};
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
