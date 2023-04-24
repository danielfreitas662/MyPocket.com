import { PublicLayout } from '@/components';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
interface AboutLayoutProps {
  children: ReactNode;
}
export default function AboutLayout({ children }: AboutLayoutProps) {
  const t = useTranslations('About');
  return <PublicLayout title={t('title')}>{children}</PublicLayout>;
}
