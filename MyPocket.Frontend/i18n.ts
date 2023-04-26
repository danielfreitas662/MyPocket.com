import { createTranslator } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));

export const locales: Array<'en' | 'pt-br'> = ['en', 'pt-br'];
export const defaultLocale = 'en';
export type Locale = (typeof locales)[0];

export const APITranslations = async (locale: string, namespace: keyof IntlMessages) => {
  const messages = (await import(`./messages/${locale}.json`)).default;
  return createTranslator({
    locale: locale,
    namespace: namespace,
    messages: messages,
  });
};
