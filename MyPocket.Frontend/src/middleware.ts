import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/private')) {
    const sessionCookie = request.cookies.get('session');
    console.log(sessionCookie);
    if (!sessionCookie) {
      console.log('Protected route - user not authenticated');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/private/:path*'],
};
