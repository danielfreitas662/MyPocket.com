import apiEndpoints from '@/services/apiEndpoints';
import { serialize, CookieSerializeOptions } from 'cookie';
import { cookies } from 'next/headers';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
};
export async function POST(request: Request) {
  try {
    console.log(cookies().get('token'));
    const res = await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.AUTHENTICATE, {
      method: 'POST',
      body: JSON.stringify({ email: 'daniel662@gmail.com', password: '*aP48104810' }),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    const response = new Response(JSON.stringify(data, null, 2));
    if (data?.token) {
      setCookie(response, 'token', data.token, { path: '/', maxAge: 2592000 });
    }
    return response;
  } catch (error) {
    return Response.error();
  }
}

export const setCookie = (res: Response, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.headers.set('Set-Cookie', serialize(name, stringValue, options));
  return res;
};
