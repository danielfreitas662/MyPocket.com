import apiEndpoints from '@/services/apiEndpoints';
import { serialize, CookieSerializeOptions } from 'cookie';
import * as jose from 'jose';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
};
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.AUTHENTICATE.endpoint, {
      method: apiEndpoints.USER.AUTHENTICATE.method,
      body: JSON.stringify(body),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log(res);
    const data = await res.json();
    const response = new Response(JSON.stringify(data, null, 2));
    if (data?.token) {
      const alg = 'HS256';
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET as string);
      const token = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('30d')
        .setSubject(data)
        .sign(secret);
      setCookie(response, 'session', token, { path: '/', maxAge: 2592000 });
    }
    return response;
  } catch (error) {
    return Response.error();
  }
}

export const setCookie = (res: Response, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  res.headers.set('Set-Cookie', serialize(name, stringValue, options));
  return res;
};
