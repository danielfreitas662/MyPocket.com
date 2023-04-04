import { PageTitle, PrivateLayout } from '@/components';
import { ReactNode } from 'react';

interface DasboardLayoutProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: DasboardLayoutProps) {
  return <PrivateLayout title="Dashboard">{children}</PrivateLayout>;
}
