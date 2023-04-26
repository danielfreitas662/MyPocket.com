import { defaultLocale } from '../../i18n';
import { getCookie } from '@/utils/cookies';

const localeCookieName = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME || 'locale';

export const getHeaders = (token?: string, locale?: string) => ({
  'content-type': 'application/json',
  'accept-language': locale || getClientLocale() || defaultLocale,
  Authorization: `Bearer ${token || getClientSession()}`,
});

export function getClientSession() {
  const token = getCookie('session');
  return token;
}
export function getClientLocale() {
  const token = getCookie(localeCookieName);
  return token;
}
