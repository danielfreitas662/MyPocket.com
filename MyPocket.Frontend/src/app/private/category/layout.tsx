import { Button, ErrorBoundary, PrivateLayout } from '@/components';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
interface CategoryLayoutProps {
  children: ReactNode;
}
export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <PrivateLayout title="Categories" extra={<Button icon={<FaPlus />}>New Category</Button>}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </PrivateLayout>
  );
}
