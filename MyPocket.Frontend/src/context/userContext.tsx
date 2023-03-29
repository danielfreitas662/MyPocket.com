'use client';
import { useRouter } from 'next/navigation';
import { destroyCookie, setCookie } from 'nookies';
import React, { ReactNode, useEffect, useState } from 'react';
import { getApiClient, httpErrorHandler } from 'services/api';
import apiEndpoints from 'services/apiEndpoints';
import { IUser, LoginModel, SignInModel } from 'types/user';

export interface UserContextProps {
  user: IUser | null;
  sigIn: (data: SignInModel) => Promise<string>;
  login: (data: LoginModel) => Promise<string>;
  logout: () => void;
  getUser: () => Promise<IUser | null>;
  error: string;
  fetching: boolean;
  loading: boolean;
}
const UserContext = React.createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const getUser = async () => {
    try {
      setFetching(true);
      const result = await getApiClient(null).get<IUser>(apiEndpoints.USER.GET_USER);
      setUser(result.data);
      setFetching(false);
      setLoading(false);
      return result.data;
    } catch (error) {
      setError(httpErrorHandler(error));
      setFetching(false);
      destroyCookie(null, 'token');
      return null;
    }
  };
  const signIn = async (data: SignInModel) => {
    try {
      setError('');
      setLoading(true);
      const result = await getApiClient(null).post(apiEndpoints.USER.SIGNUP, data);
      router.push('/login');
      setLoading(false);
      return result.data;
    } catch (error) {
      setLoading(false);
      setError(httpErrorHandler(error));
    }
  };
  const login = async (data: LoginModel) => {
    try {
      setError('');
      setLoading(false);
      const result = await getApiClient(null).post(apiEndpoints.USER.AUTHENTICATE, data);
      setCookie(undefined, 'token', result.data);
      getUser();
      const params = new URLSearchParams(window.location.search);
      const returnURL = params.get('returnURL');
      setLoading(false);
      if (returnURL) router.push(returnURL);
      else router.push('/');
      return result.data;
    } catch (error) {
      setLoading(false);
      setError(httpErrorHandler(error));
    }
  };
  const logout = () => {
    destroyCookie(null, 'token');
    setUser(null);
    //router.push('/');
    router.prefetch('/');
  };
  useEffect(() => {
    //getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, error, sigIn: signIn, login, logout, getUser, fetching, loading }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  const context = React.useContext(UserContext);
  if (context === null || undefined) throw new Error('useUser is not wrapped by its provider');
  return context;
}
export default UserContext;
