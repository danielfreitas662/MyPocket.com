'use client';
import { Button, Feedback, FormItem, TextAreaInput, TextInput } from '@/components';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
function ContactForm() {
  const [result, setResult] = useState({ error: false, message: '' });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const t = useTranslations('Contact');
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormItem label={t('firstName')}>
        <TextInput
          error={errors?.firstName?.message as string}
          {...register('firstName', { required: t('requiredField') })}
        />
      </FormItem>
      <FormItem label={t('lastName')}>
        <TextInput
          error={errors?.lastName?.message as string}
          {...register('lastName', { required: t('requiredField') })}
        />
      </FormItem>
      <FormItem label="E-mail">
        <TextInput error={errors?.email?.message as string} {...register('email', { required: t('requiredField') })} />
      </FormItem>
      <FormItem label={t('message')}>
        <TextAreaInput
          error={errors?.message?.message as string}
          rows={8}
          {...register('message', { required: t('requiredField') })}
        />
      </FormItem>
      <Button icon={<FaEnvelope />} type="submit">
        {t('send')}
      </Button>
      <Feedback type={result?.error ? 'error' : 'success'} message={result?.message} dismissable />
    </form>
  );
}
export default ContactForm;
