import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/private')) {
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/api') && request.method === 'POST') {
  }
}

export const config = {
  matcher: ['/private/:path*', '/api/:path*'],
};
