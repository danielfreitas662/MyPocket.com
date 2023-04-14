'use client';
import { useForm } from 'react-hook-form';
import FormItem from '../form/formItem';
import TextInput from '../inputComponents/textinput/textInput';
import Button from '../button/button';
import { ChangePasswordModel } from '@/types/user';
import { useState } from 'react';
import Feedback from '../feedback/feedback';
import { changePassword } from '@/services/api/user';
import { ApiRequest } from '@/types/apirequest';

function ChangePasswordForm({ email }: { email: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordModel>({ defaultValues: { email: email } });
  const [result, setResult] = useState<ApiRequest<string>>();
  const [loading, setLoading] = useState(false);
  const handleChangePassword = (values: ChangePasswordModel) => {
    setLoading(true);
    changePassword(values)
      .then((res) => {
        setLoading(false);
        setResult(res);
        reset();
      })
      .catch((res) => {
        setLoading(false);
        setResult(res);
      });
  };
  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <FormItem hidden label="email">
        <input {...register('email')} />
      </FormItem>
      <FormItem label="Current Password" error={errors.oldPassword?.message}>
        <TextInput
          type="password"
          {...register('oldPassword', { required: { value: true, message: 'Required Field' } })}
        />
      </FormItem>
      <FormItem label="New Password" error={errors.newPassword?.message}>
        <TextInput
          type="password"
          {...register('newPassword', { required: { value: true, message: 'Required Field' } })}
        />
      </FormItem>
      <FormItem label="Confirm Password" error={errors.confirmPassword?.message}>
        <TextInput
          type="password"
          {...register('confirmPassword', {
            required: { value: true, message: 'Required Field' },
            validate: (val, values) => {
              if (val !== values.newPassword) return "Passwords don't match";
            },
          })}
        />
      </FormItem>
      <Button type="submit" disabled={loading}>
        Change Password
      </Button>
      <Feedback type={result?.error ? 'error' : 'success'} message={result?.message as string} />
    </form>
  );
}
export default ChangePasswordForm;
