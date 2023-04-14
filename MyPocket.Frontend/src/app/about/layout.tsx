import { PublicLayout } from '@/components';
import { ReactNode } from 'react';
interface AboutLayoutProps {
  children: ReactNode;
}
export default function AboutLayout({ children }: AboutLayoutProps) {
  return <PublicLayout title="About Us">{children}</PublicLayout>;
}
