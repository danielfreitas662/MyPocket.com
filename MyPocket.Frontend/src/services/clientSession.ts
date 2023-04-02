import { getCookie } from '@/utils/cookies';
import * as jose from 'jose';

export async function getClientSession() {
  const sessiontoken = getCookie('session');
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET as string);
  const { payload } = await jose.jwtVerify(sessiontoken, secret);
  const session = payload.sub;
  return session;
}
