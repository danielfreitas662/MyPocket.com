'use client';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styles from './navbar.module.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import clsx from 'clsx';
import { useUser } from '../contexts/userContext';
import { IUser } from '@/types/user';
import { useLocale, useTranslations } from 'next-intl';

function Navbar({ user }: { user: IUser | null }) {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const { loading, logout } = useUser();
  const [visible, setVisible] = useState(false);
  const ref = useRef<any>();
  const PrivateNav = () => (
    <nav className={clsx({ [styles.links]: true, [styles.visible]: visible })}>
      <Link className={styles.link} href={`${locale}/private/dashboard/${moment().format('YYYY-MM-DD')}`}>
        {t('dashboard')}
      </Link>
      <Link className={styles.link} href={`${locale}/private/transaction`} locale="en-US">
        {t('transactions')}
      </Link>
      <Link className={styles.link} href={`${locale}/private/budget`}>
        {t('budgets')}
      </Link>
      <Link className={styles.link} href={`${locale}/private/account`}>
        {t('accounts')}
      </Link>
      <Link className={styles.link} href={`${locale}/private/category`}>
        {t('categories')}
      </Link>
      <Link href="#" onClick={() => logout()} className={styles.link}>
        {t('logout')}
      </Link>
      <Link className={styles.link} href={`${locale}/private/profile`}>
        {t('hello', { name: user?.firstName })}
      </Link>
    </nav>
  );
  const PublicNav = () => (
    <nav className={clsx({ [styles.links]: true, [styles.visible]: visible })}>
      <Link className={styles.link} href="/about">
        {t('about')}
      </Link>
      <Link className={styles.link} href="/contact">
        {t('contact')}
      </Link>
      <Link className={styles.link} href="/signup">
        {t('signup')}
      </Link>
      <Link className={styles.link} href="/login">
        {t('login')}
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
  if (loading) return <div />;
  return (
    <div className={styles.nav} ref={ref}>
      <div className={styles.expandedNav}>{user ? <PrivateNav /> : <PublicNav />}</div>
      <div className={clsx({ [styles.collapsedNav]: true, [styles.visible]: visible })}>
        <div
          className={clsx({ [styles.menuButton]: true, [styles.visible]: visible })}
          onClick={() => setVisible(!visible)}
        >
          <AiOutlineMenu />
        </div>
        {user ? <PrivateNav /> : <PublicNav />}
      </div>
    </div>
  );
}

export default Navbar;
