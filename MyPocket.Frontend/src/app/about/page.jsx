import { PageTitle } from 'components';
import React from 'react';
import styles from './page.module.scss';
function About() {
  return (
    <div className={styles.body}>
      <PageTitle>About us</PageTitle>
      <text className={styles.text}>
        Welcome to MyPocket.com, a user-friendly web application designed to help you manage your finances in a
        convenient and efficient way. Our mission is to empower individuals to take control of their finances by
        providing a simple and intuitive platform to manage their income, expenses, and savings. We understand that
        managing finances can be overwhelming and time-consuming, so we have created a tool that simplifies the process
        and helps you achieve your financial goals. At MyPocket.com, we value transparency, security, and user privacy.
        Our platform is built with the latest security protocols to ensure your data is safe and secure. We never sell
        your data to third parties, and we are committed to protecting your privacy at all times. Our team is made up of
        experienced professionals who are passionate about creating innovative solutions that improve people's lives. We
        are constantly working to improve the platform, adding new features and functionalities to make your experience
        even better. We believe that everyone deserves to have control over their finances, regardless of their
        background or financial situation. That's why we offer a free basic plan with essential features, as well as
        affordable premium plans with advanced functionalities. Thank you for choosing MyPocket.com as your financial
        management tool. We are committed to helping you achieve financial success and look forward to supporting you on
        your journey.
      </text>
    </div>
  );
}

export default About;
