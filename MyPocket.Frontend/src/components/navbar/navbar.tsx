'use client';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styles from './navbar.module.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import clsx from 'clsx';
import { useUser } from '../contexts/userContext';

function Navbar() {
  const { user, loading, logout } = useUser();
  const [visible, setVisible] = useState(false);
  const ref = useRef<any>();
  const PrivateNav = () => (
    <nav className={clsx({ [styles.privateNav]: true, [styles.visible]: visible })}>
      <Link className={styles.link} href={`/private/dashboard/${moment().format('YYYY-MM-DD')}`}>
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
      <Link href="#" onClick={() => logout()} className={styles.link}>
        Logout
      </Link>
      <Link className={styles.link} href="/private/profile">
        Hello, {user?.firstName}!
      </Link>
    </nav>
  );
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <header className={styles.header} ref={ref}>
      {!user && (
        <nav className={styles.expandedNav}>
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
        <div className={styles.expandedNav}>
          <PrivateNav />
        </div>
      )}
      {user && (
        <div className={clsx({ [styles.collapsedNav]: true, [styles.visible]: visible })}>
          <div
            className={clsx({ [styles.menuButton]: true, [styles.visible]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <AiOutlineMenu />
          </div>
          <PrivateNav />
        </div>
      )}
    </header>
  );
}

export default Navbar;
