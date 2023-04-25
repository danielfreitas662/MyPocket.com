import { Button, PrivateLayout } from '@/components';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
export const metadata = {
  title: 'MyPocket - Accounts',
};
interface AccountLayoutProps {
  children: ReactNode;
}
export default function AccountLayout({ children }: AccountLayoutProps) {
  const t = useTranslations('Accounts');
  return (
    <PrivateLayout
      title={t('title')}
      extra={
        <Link href="/private/account/new">
          <Button icon={<FaPlus />}>{t('newAccount')}</Button>
        </Link>
      }
    >
      {children}
    </PrivateLayout>
  );
}
