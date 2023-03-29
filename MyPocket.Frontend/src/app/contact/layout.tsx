import { PageTitle } from 'components';
import { ReactNode } from 'react';
import styles from './page.module.scss';
interface LoginLayoutProps {
  children: ReactNode;
}
export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className={styles.body}>
      <PageTitle>Login</PageTitle>
      {children}
    </div>
  );
}
