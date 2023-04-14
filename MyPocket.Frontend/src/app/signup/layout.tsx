import { PublicLayout } from '@/components';
import { ReactNode } from 'react';
interface SignupLayoutProps {
  children: ReactNode;
}
export default function SignupLayout({ children }: SignupLayoutProps) {
  return <PublicLayout title="Signup for free">{children}</PublicLayout>;
}
