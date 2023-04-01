import { ApiRequest } from '@/types/apirequest';
import { ICategory } from '@/types/category';
import { SignInModel, SignInResult } from '@/types/user';
import apiEndpoints from '../apiEndpoints';
import { getClientSession } from '../clientSession';
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
      const result: ApiRequest<SignInResult | null> = {
        error: true,
        statusCode: res.status,
        statusText: res.statusText,
        message: 'Something wrong happened',
        data: null,
      };
      return result;
    }
    const data: SignInResult = await res.json();
    const result: ApiRequest<SignInResult | null> = {
      error: false,
      statusCode: res.status,
      statusText: res.statusText,
      message: 'Account created. Proceed to login.',
      data: data,
    };
    return result;
  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
