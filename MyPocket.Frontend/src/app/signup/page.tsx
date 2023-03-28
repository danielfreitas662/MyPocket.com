import { Button, Form, PageTitle, TextInput, useForm } from 'components';
import styles from './page.module.scss';
import signup from 'images/signup/signup.png';
import Image from 'next/image';
import { SignupForm } from 'components/forms';
function Signup() {
  return (
    <div className={styles.body}>
      <PageTitle>Sign up for free</PageTitle>
      <div className={styles.description}>
        <div className={styles.image}>
          <Image src={signup} alt="signup" />
        </div>
        <div className={styles.form}>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Signup;
