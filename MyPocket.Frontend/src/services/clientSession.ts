import { getCookie } from '@/utils/cookies';

export async function getClientSession() {
  const sessiontoken = getCookie('session');
  return sessiontoken;
}
