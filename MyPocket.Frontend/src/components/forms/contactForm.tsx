'use client';
import { Button, Feedback, FormItem, TextAreaInput, TextInput } from '@/components';
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
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormItem label="First Name">
        <TextInput
          error={errors?.firstName?.message as string}
          {...register('firstName', { required: 'Required field' })}
        />
      </FormItem>
      <FormItem label="Last Name">
        <TextInput
          error={errors?.lastName?.message as string}
          {...register('lastName', { required: 'Required field' })}
        />
      </FormItem>
      <FormItem label="E-mail">
        <TextInput error={errors?.email?.message as string} {...register('email', { required: 'Required field' })} />
      </FormItem>
      <FormItem label="Message">
        <TextAreaInput
          error={errors?.message?.message as string}
          rows={8}
          {...register('message', { required: 'Required field' })}
        />
      </FormItem>
      <Button icon={<FaEnvelope />} type="submit">
        Enviar
      </Button>
      <Feedback type={result?.error ? 'error' : 'success'} message={result?.message} dismissable />
    </form>
  );
}
export default ContactForm;
