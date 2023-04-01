import { getSession } from '@/services/session';
import { IUser } from '@/types/user';
import Link from 'next/link';
import React, { Suspense } from 'react';
import Skeleton from '../skeleton/skeleton';
import LogoutButton from './logoutButton';
import styles from './navbar.module.scss';
function Navbar({ user }: { user: IUser }) {
  return (
    <Suspense fallback={<Skeleton rows={1} />}>
      <header className={styles.header}>
        {!user && (
          <nav className={styles.nav}>
            <Link className={styles.link} href="/about">
              About
            </Link>
            <Link className={styles.link} href="/contact">
              Contact
            </Link>
            <Link className={styles.link} href="/signup">
              Signup
            </Link>
            <Link className={styles.link} href="/login">
              Login
            </Link>
          </nav>
        )}
        {user && (
          <nav className={styles.nav}>
            <Link className={styles.link} href="/private/dashboard">
              Dashboard
            </Link>
            <Link className={styles.link} href="/private/transaction">
              Transactions
            </Link>
            <Link className={styles.link} href="/private/budget">
              Budgets
            </Link>
            <Link className={styles.link} href="/private/account">
              Accounts
            </Link>
            <Link className={styles.link} href="/private/category">
              Categories
            </Link>
            <LogoutButton />
            <Link className={styles.link} href="/private/profile">
              Hello, {user.firstName}!
            </Link>
          </nav>
        )}
      </header>
    </Suspense>
  );
}

export default Navbar;
