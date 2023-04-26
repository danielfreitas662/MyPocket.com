import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './services/api/user';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { defaultLocale, locales } from '../i18n';
import createMiddleware from 'next-intl/middleware';

const localeCookieName = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME || 'locale';
const responseIntl = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: defaultLocale,
  localeDetection: true,
});

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
  const search = request.nextUrl.search;

  let cookieLocale: string | null = request.cookies.get(localeCookieName)?.value || null;
  if (!cookieLocale) {
    const response = responseIntl(request);
    return response;
  }
  const pathMissingLocale = locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
  if (!validateLocale(cookieLocale)) {
    cookieLocale = null;
  }
  if (pathMissingLocale) {
    if (cookieLocale) {
      const response = NextResponse.redirect(new URL(`/${cookieLocale}${pathname}${search}`, request.nextUrl));
      return response;
    } else {
      const response = NextResponse.redirect(new URL(`/${defaultLocale}${pathname}${search}`, request.nextUrl));
      response.cookies.set(localeCookieName, defaultLocale);
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
        response.cookies.set(localeCookieName, pathLocale);
        return response;
      }
    }
  }
  //handle bock private router for non authenticated users
  const locale = getLocale(request) || defaultLocale;
  if (pathname.toLowerCase().startsWith(`/${locale}/private`)) {
    const session = request.cookies.get('session')?.value;
    const user = await getUser(session, locale);
    if (!user) {
      return NextResponse.redirect(
        new URL(`/${locale}/login?returnUrl=${request.nextUrl.pathname + request.nextUrl.search}`, request.nextUrl)
      );
    }
  }
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
