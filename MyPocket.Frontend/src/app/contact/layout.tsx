import { PublicLayout } from '@/components';
import { ReactNode } from 'react';
interface LoginLayoutProps {
  children: ReactNode;
}
export default function LoginLayout({ children }: LoginLayoutProps) {
  return <PublicLayout title="Contact Us">{children}</PublicLayout>;
}
