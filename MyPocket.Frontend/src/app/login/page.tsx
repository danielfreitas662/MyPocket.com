import { PageTitle } from 'components';
import styles from './page.module.scss';
import loginPic from 'images/login/login.png';
import Image from 'next/image';
import { LoginForm } from 'components/forms';
function Login() {
  return (
    <div className={styles.body}>
      <PageTitle>Enter your credentials</PageTitle>
      <div className={styles.description}>
        <div className={styles.image}>
          <Image src={loginPic} width={400} alt="login" />
        </div>
        <div className={styles.form}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
