import { Button } from '@/components';
import PrivateLayout from '@/components/privateLayout/privateLayout';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
export const metadata = {
  title: 'MyPocket - Transactions',
};
interface TransactionLayoutProps {
  children: ReactNode;
}
export default function TransactionLayout({ children }: TransactionLayoutProps) {
  const t = useTranslations('Transactions');
  return (
    <PrivateLayout
      title={t('title')}
      extra={
        <Link href="/private/transaction/new">
          <Button icon={<FaPlus />}>{t('newTransaction')}</Button>
        </Link>
      }
    >
      {children}
    </PrivateLayout>
  );
}
