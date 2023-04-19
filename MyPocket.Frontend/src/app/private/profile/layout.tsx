import { PrivateLayout } from '@/components';
import { ReactNode } from 'react';

export const metadata = {
  title: 'MyPocket - Profile',
};
interface ProfileLayoutProps {
  children: ReactNode;
}
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <PrivateLayout title="Profile">{children}</PrivateLayout>;
}
