'use client';

import { Button, FormItem, TextInput } from '@/components';
import { signup } from '@/services/api/auth';
import { ApiRequest } from '@/types/apirequest';
import { SignInModel, SignInResult } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './forms.module.scss';

function SignupForm() {
  const [result, setResult] = useState<ApiRequest<SignInResult | null>>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInModel>();
  const submitForm = (data: SignInModel) => {
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
    <form onSubmit={handleSubmit((data) => submitForm(data))}>
      <FormItem label="First Name" error={errors['firstName']?.message}>
        <TextInput {...register('firstName', { required: 'Required field' })} />
      </FormItem>
      <FormItem label="Last Name" error={errors['lastName']?.message}>
        <TextInput {...register('lastName', { required: 'Required field' })} />
      </FormItem>
      <FormItem label="E-mail" error={errors['email']?.message}>
        <TextInput
          {...register('email', {
            required: 'Required field',
            pattern: { value: GetPattern('email'), message: 'Wrong e-mail format' },
          })}
        />
      </FormItem>
      <FormItem label="Password" error={errors['password']?.message}>
        <TextInput
          type="password"
          {...register('password', {
            required: 'Required field',
            minLength: 8,
          })}
        />
      </FormItem>
      <FormItem error={errors['confirmPassword']?.message} label="Confirm Password">
        <TextInput
          type="password"
          {...register('confirmPassword', {
            required: 'Required field',
            minLength: 8,
            validate: (value, values) => value == values.password || 'Passwords don`t match',
          })}
        />
      </FormItem>
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
    </form>
  );
}
export default SignupForm;
//onFinish={(values) => sigIn(values)}
