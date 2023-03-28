import axios from 'axios';
import { NextRequest } from 'next/server';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { getCookie } from 'utils/cookies';
import apiEndpoints from './apiEndpoints';

export function getApiClient(request: any) {
  const { token } = parseCookies(request); //request && request?.cookies.get('token')?.value;
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
  });
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return api;
}

export function httpErrorHandler(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    if (error.response?.data) {
      toast.error(error.response?.data);
      return error.response?.data;
    }
  } else {
    const message = 'Something wrong happened. Try again later.';
    toast.error(message);
    return message;
  }
}

export async function getUser(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    var result = await (
      await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.GET_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
