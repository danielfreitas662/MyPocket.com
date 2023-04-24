import { PrivateLayout } from '@/components';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

export const metadata = {
  title: 'MyPocket - Profile',
};
interface ProfileLayoutProps {
  children: ReactNode;
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const t = useTranslations('Profile');
  return <PrivateLayout title={t('title')}>{children}</PrivateLayout>;
}
