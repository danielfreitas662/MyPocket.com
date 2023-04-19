import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './services/api/user';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.toLocaleLowerCase().startsWith('/private')) {
    const session = request.cookies.get('session')?.value;
    const user = await getUser(session);
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?returnUrl=${request.nextUrl.pathname + request.nextUrl.search}`, request.nextUrl)
      );
    }
  }
  return NextResponse.rewrite(
    new URL(request.nextUrl.pathname.toLocaleLowerCase() + request.nextUrl.search, request.nextUrl)
  );
}

export const config = {};
