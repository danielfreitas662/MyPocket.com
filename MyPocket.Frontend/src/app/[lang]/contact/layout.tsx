import { PublicLayout } from '@/components';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
interface LoginLayoutProps {
  children: ReactNode;
}
export default function LoginLayout({ children }: LoginLayoutProps) {
  const t = useTranslations('Contact');
  return <PublicLayout title={t('title')}>{children}</PublicLayout>;
}
