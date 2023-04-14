import styles from './page.module.scss';
import loginPic from '@/images/login/login.png';
import Image from 'next/image';
import ForgotPasswordForm from '@/components/forms/forgotPasswordForm';
function Login() {
  return (
    <div className={styles.description}>
      <div className={styles.image}>
        <Image src={loginPic} width={400} alt="login" />
      </div>
      <div className={styles.form}>
        <h4>Enter the email registered to your account</h4>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default Login;
