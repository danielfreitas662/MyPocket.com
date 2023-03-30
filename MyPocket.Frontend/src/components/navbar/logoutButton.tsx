'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import styles from './navbar.module.scss';

export default function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    destroyCookie(null, 'session');
    router.push('/');
    router.refresh();
  };
  return (
    <Link href="#" onClick={() => logout()} className={styles.link}>
      Logout
    </Link>
  );
}
