import Link from 'next/link';
import React, { CSSProperties } from 'react';
import styles from './navbar.module.scss';
function Navbar({ style }: { style: CSSProperties }) {
  return (
    <header className={styles.header} style={style}>
      <nav className={styles.nav}>
        <Link className={styles.link} href="/about">
          About
        </Link>
        <Link className={styles.link} href="/contact">
          Contact
        </Link>
        <Link className={styles.link} href="/register">
          Signup
        </Link>
        <Link className={styles.link} href="/login">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
