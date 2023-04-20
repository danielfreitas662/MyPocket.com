'use client';

import { Button, Feedback, FormItem, TextInput } from '@/components';
import { signup } from '@/services/api/auth';
import { ApiRequest } from '@/types/apirequest';
import { SignInModel } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function SignupForm() {
  const [result, setResult] = useState<ApiRequest<string>>();
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
        router.push('/login');
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
            minLength: { value: 8, message: 'Passoword must have at least 8 characters' },
          })}
        />
      </FormItem>
      <FormItem error={errors['confirmPassword']?.message} label="Confirm Password">
        <TextInput
          type="password"
          {...register('confirmPassword', {
            required: 'Required field',
            minLength: { value: 8, message: 'Passoword must have at least 8 characters' },
            validate: (value, values) => value == values.password || 'Passwords don`t match',
          })}
        />
      </FormItem>
      <Button type="submit" disabled={loading}>
        Sign Up
      </Button>
      <Feedback message={result?.message as string} type={result?.error ? 'error' : 'success'} dismissable />
    </form>
  );
}
export default SignupForm;
