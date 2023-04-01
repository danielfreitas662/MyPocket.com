'use client';

import { Button, Form, TextInput } from '@/components';
import styles from './forms.module.scss';

function SignupForm() {
  const error = null;
  const loading = false;
  return (
    <Form>
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
      <Button type="submit" disabled={loading}>
        Sign Up
      </Button>
      {error && <div className={styles.error}>{error}</div>}
    </Form>
  );
}
export default SignupForm;
//onFinish={(values) => sigIn(values)}
