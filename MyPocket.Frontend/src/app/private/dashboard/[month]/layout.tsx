import { PrivateLayout } from '@/components';
import { ReactNode } from 'react';
import DatePickerMenu from './datePickerMenu';

interface DasboardLayoutProps {
  children: ReactNode;
  params: { month: string };
}
export default function DashboardLayout({ children, params }: DasboardLayoutProps) {
  return (
    <PrivateLayout title="Dashboard" extra={<DatePickerMenu month={params.month} />}>
      {children}
    </PrivateLayout>
  );
}
