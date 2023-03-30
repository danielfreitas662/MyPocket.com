'use client';
import { Button, Form, TextInput, useForm } from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './forms.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
function LoginForm() {
  const form = useForm<FormData>({});
  const router = useRouter();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (values: any) => {
    setLoading(true);
    fetch('/api/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResult(data);
        if (!data?.error) {
          router.refresh();
          router.push('/');
        }
      })
      .catch((res) => {
        setLoading(false);
        setResult({ message: res });
      });
  };
  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="email" label="E-mail" required type="email">
        <TextInput />
      </Form.Item>
      <Form.Item name="password" label="Password" required>
        <TextInput type="password" />
      </Form.Item>
      <Button type="submit" disabled={loading}>
        Login
      </Button>
      {result?.message && <div className={styles.error}>{result?.message}</div>}
    </Form>
  );
}
export default LoginForm;
