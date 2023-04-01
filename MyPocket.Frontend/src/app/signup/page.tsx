import styles from './page.module.scss';
import signup from '@/images/signup/signup.png';
import Image from 'next/image';
import { SignupForm } from '@/components/forms';
import { FormProvider } from '@/components/form/form';
function Signup() {
  return (
    <div className={styles.description}>
      <div className={styles.image}>
        <Image src={signup} alt="signup" />
      </div>
      <div className={styles.form}>
        <FormProvider>
          <SignupForm />
        </FormProvider>
      </div>
    </div>
  );
}

export default Signup;
