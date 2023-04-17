import { Session } from '@/types/session';
import { cookies } from 'next/headers';

export async function getSession() {
  const session = cookies().get('session')?.value;
  const headers: HeadersInit = session ? { Session: session } : {};
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    cache: 'no-store',
    next: {
      revalidate: 2,
    },
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
  });
  const data: Session = await res.json();
  return data;
}
