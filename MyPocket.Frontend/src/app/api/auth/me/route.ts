import { headers } from 'next/headers';
import * as jose from 'jose';

export async function GET(request: Request) {
  const sessiontoken = headers().get('Session');
  if (sessiontoken) {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET as string);
    const {
      payload: { sub, exp },
    } = await jose.jwtVerify(sessiontoken, secret);
    return new Response(JSON.stringify(sub), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
  return new Response(JSON.stringify({ user: null }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
