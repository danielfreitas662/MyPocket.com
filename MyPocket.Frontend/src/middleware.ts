import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privateRoutes, publicRoutes } from './routes/routes';

export async function middleware(request: NextRequest) {
  if (privateRoutes.some((c) => request.nextUrl.pathname.startsWith(c))) {
    //const user = await getUser(request);
    //if (!user) return NextResponse.redirect(new URL(`/login?returnURL=${request.nextUrl.pathname}`, request.url));
  }
  if (publicRoutes.some((c) => request.nextUrl.pathname.startsWith(c))) {
  }

  return NextResponse.next();
}
/* 
export const config = {
  matcher: ['/account/:path*', '/category/:path*', '/transaction/:path*', '/budget/:path*'],
};
 */
