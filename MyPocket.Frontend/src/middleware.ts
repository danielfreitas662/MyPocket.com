import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './services/api/user';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt', 'pt-BR'],
  defaultLocale: 'en-US',
});

/* export async function middleware(request: NextRequest) {
  let response = intlmiddleware(request);

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
} */

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
