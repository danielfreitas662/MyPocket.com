import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/private')) {
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/private/transaction')) {
    const current = request.nextUrl.searchParams.get('current') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 10;
    const sortField = request.nextUrl.searchParams.get('sortField') || 'date';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') || 'asc';
    return NextResponse.rewrite(
      new URL(
        `${request.nextUrl.pathname}?current=${current}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`,
        request.nextUrl
      )
    );
  }
  if (request.nextUrl.pathname.startsWith('/api')) {
  }
}

export const config = {
  matcher: ['/private/:path*', '/api/:path*'],
};
