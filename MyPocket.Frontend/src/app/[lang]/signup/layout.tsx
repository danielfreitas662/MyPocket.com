import { PublicLayout } from '@/components';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
interface SignupLayoutProps {
  children: ReactNode;
}
export default function SignupLayout({ children }: SignupLayoutProps) {
  const t = useTranslations('Signup');
  return <PublicLayout title={t('title')}>{children}</PublicLayout>;
}
