'use client';

import { Button, Form, TextInput, useForm } from 'components';
import { useUser } from 'context/userContext';
import styles from './forms.module.scss';

function SignupForm() {
  const form = useForm({});
  const { sigIn, error } = useUser();
  return (
    <Form form={form} onFinish={(values) => sigIn(values)}>
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
      {error && <div className={styles.error}>{error}</div>}
    </Form>
  );
}
export default SignupForm;
