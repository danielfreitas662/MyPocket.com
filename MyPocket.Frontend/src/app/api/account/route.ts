import { CookieSerializeOptions, serialize } from 'cookie';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
export const config = {
  runtime: 'edge',
};
export async function GET(request: Request) {
  const response = NextResponse.json({ daniel: 'test' }, { status: 200 });
  response.headers.set('Set-Cookie', serialize('session2', 'daniel', { httpOnly: true, path: '/' }));
  //setCookie(response, 'session2', '123', { httpOnly: true, path: '/' });
  response.cookies.set({
    name: 'jwt',
    value: '1111',
    httpOnly: true,
    maxAge: 60 * 60,
  });
  return response;
}
export const setCookie = (res: Response, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  res.headers.set('Set-Cookie', serialize(name, stringValue, options));
  return res;
};
