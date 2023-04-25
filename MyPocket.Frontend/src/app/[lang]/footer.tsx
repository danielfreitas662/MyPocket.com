import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
function Footer() {
  const t = useTranslations('Home');

  return (
    <footer className="footer">
      <div className="footer-column">MyPocket</div>
      <div className="footer-column">
        <Link href="/about">{t('about')}</Link>
        <Link href="/contact">{t('contact')}</Link>
        <Link href="/signup">{t('signup')}</Link>
      </div>
      <div className="footer-column">
        <div>©Daniel Freitas</div>
        <div>daniel662@gmail.com</div>
      </div>
    </footer>
  );
}

export default Footer;
