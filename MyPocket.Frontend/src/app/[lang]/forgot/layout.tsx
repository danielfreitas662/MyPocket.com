import { PublicLayout } from '@/components';
import { ReactNode } from 'react';
interface ForgotPasswordLayoutProps {
  children: ReactNode;
}
export default function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return <PublicLayout title="Forgot Password">{children}</PublicLayout>;
}
