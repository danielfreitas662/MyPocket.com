import { cookies } from 'next/headers';

export async function getSession() {
  const token = cookies().get('token')?.value;
  const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    cache: 'no-store',
    next: {
      revalidate: 2,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}
