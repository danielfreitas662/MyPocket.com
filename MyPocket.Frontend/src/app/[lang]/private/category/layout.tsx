import { Button, ErrorBoundary, PrivateLayout } from '@/components';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

export const metadata = {
  title: 'MyPocket - Categories',
};
interface CategoryLayoutProps {
  children: ReactNode;
}
export default function CategoryLayout({ children }: CategoryLayoutProps) {
  const t = useTranslations('Categories');
  return (
    <PrivateLayout
      title={t('title')}
      extra={
        <Link href="/private/category/new">
          <Button icon={<FaPlus />}>{t('newCategory')}</Button>
        </Link>
      }
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </PrivateLayout>
  );
}
