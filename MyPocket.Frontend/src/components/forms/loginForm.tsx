'use client';
import { Button, Feedback, FormItem, TextInput } from '@/components';
import { LoginModel } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const router = useRouter();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginModel>();
  const finish = (values: any) => {
    setLoading(true);
    fetch('http://localhost:3000/api/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResult(data);
        if (data?.success) {
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
    <form onSubmit={handleSubmit(finish)}>
      <FormItem label="E-mail" error={errors?.email?.message as string}>
        <TextInput
          {...register('email', {
            required: 'Required field',
            pattern: { value: GetPattern('email'), message: 'Incorrect e-mail format' },
          })}
        />
      </FormItem>
      <FormItem label="Password" error={errors?.password?.message as string}>
        <TextInput
          type="password"
          error={errors?.password?.message as string}
          {...register('password', {
            required: 'Required field',
          })}
        />
      </FormItem>
      <Button type="submit" disabled={loading}>
        Login
      </Button>
      <Feedback type={!result?.success ? 'error' : 'success'} message={result?.message} />
    </form>
  );
}
export default LoginForm;
