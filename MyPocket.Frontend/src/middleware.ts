import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { objectToQueryString } from './utils/queryString';

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
    const description = request.nextUrl.searchParams.get('description') || null;
    const amount = request.nextUrl.searchParams.get('amount') || null;
    const date = request.nextUrl.searchParams.get('date') || null;
    const category = request.nextUrl.searchParams.get('category') || null;
    const account = request.nextUrl.searchParams.get('account') || null;
    /*
    return NextResponse.rewrite(
      new URL(
        `${request.nextUrl.pathname}?${objectToQueryString({
          current,
          pageSize,
          sortField,
          sortOrder,
          description,
          amount,
          date,
          category,
          account,
        })}`,
        request.nextUrl
      )
    );
    */
  }
  if (request.nextUrl.pathname.startsWith('/api')) {
  }
}

export const config = {
  matcher: ['/private/:path*', '/api/:path*'],
};
