'use client';
import { Button, Form, PageTitle, TextInput, useForm } from 'components';
import styles from './page.module.scss';
import login from 'images/login/login.png';
import Image from 'next/image';
function Login() {
  const form = useForm({});
  return (
    <div className={styles.body}>
      <PageTitle>Enter yout credentials</PageTitle>
      <div className={styles.description}>
        <div className={styles.image}>
          <Image src={login} width={400} alt="login" />
        </div>
        <div className={styles.form}>
          <Form form={form} onFinish={(values) => console.log(values)}>
            <Form.Item name="email" label="E-mail" required type="email">
              <TextInput />
            </Form.Item>
            <Form.Item name="password" label="Password" required>
              <TextInput type="password" />
            </Form.Item>
            <Button type="submit">Login</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
