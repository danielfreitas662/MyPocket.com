import React from 'react';
import styles from './page.module.scss';
import contact from '../../images/contact/contact.png';
import Image from 'next/image';

function Contact() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>Get in touch with us</div>
      <div className={styles.text}>
        <div className={styles.image}>
          <Image src={contact} alt="contact" height={300} />
        </div>
        <div className={styles.form}>
          <form name="contactForm">
            <div className={styles.field}>
              <label htmlFor="firstname">First Name</label>
              <input id="firstname" type="text" placeholder="First name..." required />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastname">Last Name</label>
              <input id="lastname" type="text" placeholder="Last name..." required />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="E-mail..." required />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Message..." required />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
