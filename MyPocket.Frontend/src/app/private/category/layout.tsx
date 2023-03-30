import { Button, PrivateLayout } from '@/components';
import { ReactNode } from 'react';
interface CategoryLayoutProps {
  children: ReactNode;
}
export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <PrivateLayout title="Categories" extra={<Button>New Category</Button>}>
      {children}
    </PrivateLayout>
  );
}
