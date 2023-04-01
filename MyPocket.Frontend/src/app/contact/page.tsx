import React from 'react';
import styles from './page.module.scss';
import contact from '../../images/contact/contact.png';
import Image from 'next/image';
import { ContactForm } from '@/components/forms';
import { FormProvider } from '@/components/form/form';

export const metadata = {
  title: 'MyPocket - Contact',
};
function Contact() {
  return (
    <div className={styles.text}>
      <div className={styles.image}>
        <Image src={contact} alt="contact" height={300} />
      </div>
      <div className={styles.form}>
        <FormProvider>
          <ContactForm />
        </FormProvider>
      </div>
    </div>
  );
}

export default Contact;
