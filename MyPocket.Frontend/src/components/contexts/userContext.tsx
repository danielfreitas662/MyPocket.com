'use client';
import { authenticate, getUser } from '@/services/api/user';
import { IUser, LoginModel, LoginResult } from '@/types/user';
import { setCookie } from '@/utils/cookies';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

interface UserContextProps {
  user: IUser | null;
  login: (data: LoginModel, returnUrl?: string) => void;
  logout: () => void;
  loading: boolean;
  result: LoginResult;
}
const UserContext = React.createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoginResult>({} as LoginResult);
  const router = useRouter();
  const logout = () => {
    setCookie('session', null, 0);
    setUser(null);
    router.push('/');
    router.refresh();
  };
  const login = (values: LoginModel, returnUrl?: string) => {
    setLoading(true);
    authenticate(values)
      .then((res) => {
        setLoading(false);
        setResult(res);
        if (res?.success) {
          setUser(res.user);
          router.refresh();
          if (returnUrl) {
            router.push(returnUrl);
          } else router.push('/private/dashboard/' + moment().format('YYYY-MM-DD'));
        }
      })
      .catch((res) => {
        setLoading(false);
        setResult(res);
      });
  };
  useEffect(() => {
    setLoading(true);
    getUser()
      .then((res) => {
        setUser(res);
        setLoading(false);
      })
      .catch((res) => setUser(res));
  }, []);
  return <UserContext.Provider value={{ user, loading, login, logout, result }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return React.useContext(UserContext);
}
