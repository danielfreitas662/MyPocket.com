import { ApiRequest } from '@/types/apirequest';
import { SignInModel, SignInResult } from '@/types/user';
import apiEndpoints from '../apiEndpoints';
const apiAddress: string = process.env.NEXT_PUBLIC_API_ADDRESS as string;
export const signup = async (user: SignInModel) => {
  try {
    const res = await fetch(apiAddress + apiEndpoints.USER.SIGNUP.endpoint, {
      method: apiEndpoints.USER.SIGNUP.method,
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      const data: string = await res.text();
      const result: ApiRequest<string> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: data,
        data: '',
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
