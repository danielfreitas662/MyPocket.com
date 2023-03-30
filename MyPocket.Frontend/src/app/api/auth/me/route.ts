import apiEndpoints from '@/services/apiEndpoints';
import { cookies, headers } from 'next/headers';

export const config = {
  runtime: 'edge',
};
export async function GET(request: Request) {
  const token = headers().get('Authorization');
  const res = await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.GET_USER, {
    method: 'GET',
    headers: { Authorization: `${token}` },
    cache: 'no-cache',
  });
  if (!res.ok) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
  const data = await res.json();
  return new Response(JSON.stringify({ user: data }));
}

function getCookies(req: Request) {
  const cookie = req.headers.get('cookie');
  const cookies = new Map();
  if (!cookie) {
    return cookies;
  }
  const pairs = cookie.split(/;\s+/);
  for (const pair of pairs) {
    const parts = pair.trim().split('=');
    cookies.set(parts[0], parts[1]);
  }
  return cookies;
}
