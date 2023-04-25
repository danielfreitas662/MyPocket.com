'use client';
import { usePathname } from 'next/navigation';
import { locales } from '../../../i18n';
import Link from 'next/link';
import usaflag from '../../images/usaflag.png';
import brazilflag from '../../images/brazilflag.png';
import Image from 'next/image';

function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  return (
    <div>
      {locales
        .filter((loc) => loc !== currentLocale)
        .map((loc) => {
          return (
            <Link
              key={loc}
              href={redirectedPathName(loc)}
              title={currentLocale === 'pt-br' ? 'English' : 'Portuguese'}
              locale={loc}
            >
              {currentLocale === 'pt-br' && <Image alt="usaflag" src={usaflag} width={20} />}
              {currentLocale === 'en' && <Image alt="brazilflag" src={brazilflag} width={20} />}
            </Link>
          );
        })}
    </div>
  );
}
export default LocaleSwitcher;
