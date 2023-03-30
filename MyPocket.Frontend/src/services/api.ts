import { cookies } from 'next/headers';

export async function getSession() {
  const session = cookies().get('session')?.value;
  const headers: HeadersInit = session ? { Session: session } : {};
  const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    cache: 'no-store',
    next: {
      revalidate: 2,
    },
    headers: {
      ...headers,
    },
  });
  const data = await res.json();
  return data;
}
