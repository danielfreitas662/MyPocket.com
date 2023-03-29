import Link from 'next/link';
import React, { CSSProperties } from 'react';
import { getUser } from 'services/api';
import styles from './navbar.module.scss';
async function Navbar({ style }: { style: CSSProperties }) {
  //const { logout, getUser } = useUser();
  const user = await getUser(null);
  return (
    <header className={styles.header} style={style}>
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
          <Link className={styles.link} href="/transaction">
            Transactions
          </Link>
          <Link className={styles.link} href="/budget">
            Budgets
          </Link>
          <Link className={styles.link} href="/account">
            Accounts
          </Link>
          <Link className={styles.link} href="/category">
            Categories
          </Link>
          <Link className={styles.link} href="" onClick={() => null}>
            Logout
          </Link>
          <Link className={styles.link} href="/profile">
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
