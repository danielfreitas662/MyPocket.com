import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './navbar.module.scss';
function Navbar() {
  return (
    <header className={styles.header}>
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
