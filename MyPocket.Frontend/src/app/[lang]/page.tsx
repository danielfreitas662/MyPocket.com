import { useTranslations, useLocale } from 'next-intl';
import UnAuthHome from './home';

export default function Home() {
  const t = useTranslations('Home');
  return <UnAuthHome content={t} />;
}
