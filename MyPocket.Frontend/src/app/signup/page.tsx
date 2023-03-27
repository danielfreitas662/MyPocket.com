'use client';
import { Button, Form, PageTitle, TextInput, useForm } from 'components';
import styles from './page.module.scss';
import signup from 'images/signup/signup.png';
import Image from 'next/image';
function Signup() {
  const form = useForm({});
  return (
    <div className={styles.body}>
      <PageTitle>Sign up for free</PageTitle>
      <div className={styles.description}>
        <div className={styles.image}>
          <Image src={signup} alt="signup" />
        </div>
        <div className={styles.form}>
          <Form form={form} onFinish={(values) => console.log(values)}>
            <Form.Item name="firstName" label="First Name" required>
              <TextInput />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" required>
              <TextInput />
            </Form.Item>
            <Form.Item name="email" label="E-mail" required type="email">
              <TextInput />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              required
              minLength={{ value: 8, message: 'Must have at least 8 characters' }}
            >
              <TextInput type="password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              required
              validate={(value, values) => value == values.password || 'Passwords don`t match'}
            >
              <TextInput type="password" />
            </Form.Item>
            <Button type="submit">Sign Up</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
