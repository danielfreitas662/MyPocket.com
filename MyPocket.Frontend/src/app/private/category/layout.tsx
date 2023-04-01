import { Button, ErrorBoundary, PrivateLayout } from '@/components';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
interface CategoryLayoutProps {
  children: ReactNode;
}
export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <PrivateLayout
      title="Categories"
      extra={
        <Link href="/private/category/new">
          <Button icon={<FaPlus />}>New Category</Button>
        </Link>
      }
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </PrivateLayout>
  );
}
