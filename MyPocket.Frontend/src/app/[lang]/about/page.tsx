import React from 'react';
import styles from './page.module.scss';
import { useTranslations } from 'next-intl';
export const metadata = {
  title: 'MyPocket - About',
};
function About() {
  const t = useTranslations('About');
  return <div className={styles.text}>{t('description')}</div>;
}

export default About;
