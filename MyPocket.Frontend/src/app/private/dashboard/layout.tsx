import { PageTitle } from '@/components';
import { ReactNode } from 'react';

interface DasboardLayoutProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: DasboardLayoutProps) {
  return (
    <div>
      <PageTitle>Dasboard</PageTitle>
      {children}
    </div>
  );
}
