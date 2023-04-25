'use client';

import { Button, Feedback, FormItem, TextInput } from '@/components';
import { signup } from '@/services/api/auth';
import { ApiRequest } from '@/types/apirequest';
import { SignInModel } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function SignupForm() {
  const [result, setResult] = useState<ApiRequest<string>>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('Signup');
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
      <FormItem label={t('firstName')} error={errors['firstName']?.message}>
        <TextInput {...register('firstName', { required: t('requiredField') })} />
      </FormItem>
      <FormItem label={t('lastName')} error={errors['lastName']?.message}>
        <TextInput {...register('lastName', { required: t('requiredField') })} />
      </FormItem>
      <FormItem label="E-mail" error={errors['email']?.message}>
        <TextInput
          {...register('email', {
            required: t('requiredField'),
            pattern: { value: GetPattern('email'), message: 'Wrong e-mail format' },
          })}
        />
      </FormItem>
      <FormItem label={t('password')} error={errors['password']?.message}>
        <TextInput
          type="password"
          {...register('password', {
            required: t('requiredField'),
            minLength: { value: 8, message: t('minLength') },
          })}
        />
      </FormItem>
      <FormItem error={errors['confirmPassword']?.message} label={t('passwordConfirm')}>
        <TextInput
          type="password"
          {...register('confirmPassword', {
            required: t('requiredField'),
            minLength: { value: 8, message: t('minLength') },
            validate: (value, values) => value == values.password || t('noMatch'),
          })}
        />
      </FormItem>
      <Button type="submit" disabled={loading}>
        {t('signup')}
      </Button>
      <Feedback message={result?.message as string} type={result?.error ? 'error' : 'success'} dismissable />
    </form>
  );
}
export default SignupForm;
