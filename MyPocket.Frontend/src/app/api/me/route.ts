import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import apiEndpoints from 'services/apiEndpoints';

export async function GET(request: Request) {
  const cookieHandler = cookies();
  const token = cookieHandler.get('token')?.value;
  if (!token) return null;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    axios.get(process.env.NEXT_PUBLIC_API_ADDRESS + apiEndpoints.USER.GET_USER);
    const json = await res.json();
    if (json) return NextResponse.redirect('/dashboard');
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: true });
  }
}
