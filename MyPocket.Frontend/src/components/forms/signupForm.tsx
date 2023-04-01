'use client';

import { Button, Form, TextInput } from '@/components';
import { signup } from '@/services/api/auth';
import { ApiRequest } from '@/types/apirequest';
import { SignInModel, SignInResult } from '@/types/user';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './forms.module.scss';

function SignupForm() {
  const [result, setResult] = useState<ApiRequest<SignInResult | null>>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (data: SignInModel) => {
    setLoading(true);
    signup(data)
      .then((res) => {
        setResult(res);
        setLoading(false);
        router.push('/');
      })
      .catch((res) => {
        setLoading(false);
        setResult(res);
      });
  };
  return (
    <Form onFinish={handleSubmit}>
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
      {result?.error && (
        <div
          className={clsx({
            [styles.error]: true,
            [styles.success]: result.error,
          })}
        >
          {result.message}
        </div>
      )}
    </Form>
  );
}
export default SignupForm;
//onFinish={(values) => sigIn(values)}
