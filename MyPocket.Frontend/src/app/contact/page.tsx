import React from 'react';
import styles from './page.module.scss';
import contact from '../../images/contact/contact.png';
import Image from 'next/image';
import { PageTitle } from 'components';
import { ContactForm } from 'components/forms';

export const metadata = {
  title: 'MyPocket - Contact',
};
function Contact() {
  return (
    <div className={styles.body}>
      <PageTitle>Get in touch with us</PageTitle>
      <div className={styles.text}>
        <div className={styles.image}>
          <Image src={contact} alt="contact" height={300} />
        </div>
        <div className={styles.form}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
