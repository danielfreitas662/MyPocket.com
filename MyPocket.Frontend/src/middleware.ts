import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './services/api/user';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { defaultLocale, locales } from '../i18n';
import { useLocale } from 'next-intl';

/* export const middleware = createMiddleware({
  locales: ['en', 'pt', 'pt-BR'],
  defaultLocale: 'en',
}); */

const redirectedPathName = (locale: string, pathName: string) => {
  if (!pathName) return '/';
  const segments = pathName.split('/');
  segments[1] = locale;
  return segments.join('/');
};

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  return matchLocale(languages, locales, defaultLocale);
}

const validateLocale = (locale: string | null) => {
  if (!locale) return false;
  return !!locales.find((c) => c === locale);
};

export async function middleware(request: NextRequest) {
  //handle locale
  const pathname = request.nextUrl.pathname;
  let cookieLocale: string | null = request.cookies.get('NEXT_LOCALE')?.value || null;
  const pathMissingLocale = locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
  if (!validateLocale(cookieLocale)) {
    cookieLocale = null;
  }
  if (pathMissingLocale) {
    if (cookieLocale) {
      const response = NextResponse.redirect(new URL(`/${cookieLocale}${pathname}`, request.nextUrl));
      return response;
    } else {
      const response = NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.nextUrl));
      response.cookies.set('NEXT_LOCALE', defaultLocale);
      return response;
    }
  } else {
    let pathLocale = null;
    locales.forEach((loc) => {
      if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
        pathLocale = loc;
      }
    });
    if (pathLocale) {
      if (pathLocale !== cookieLocale) {
        const response = NextResponse.rewrite(new URL(redirectedPathName(pathLocale, pathname), request.nextUrl));
        response.cookies.set('NEXT_LOCALE', pathLocale);
        return response;
      }
    }
  }
  //handle bock private router for non authenticated users
  const locale = getLocale(request) || defaultLocale;
  if (request.nextUrl.pathname.toLocaleLowerCase().startsWith(`/${locale}/private`)) {
    const session = request.cookies.get('session')?.value;
    const user = await getUser(session);

    if (!user) {
      return NextResponse.redirect(
        new URL(`/${locale}/login?returnUrl=${request.nextUrl.pathname + request.nextUrl.search}`, request.nextUrl)
      );
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
