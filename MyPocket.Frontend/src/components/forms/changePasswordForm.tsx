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
import { useTranslations } from 'next-intl';

function ChangePasswordForm({ email }: { email: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordModel>({ defaultValues: { email: email } });
  const [result, setResult] = useState<ApiRequest<string>>();
  const [loading, setLoading] = useState(false);
  const t = useTranslations('Profile');
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
    <div>
      <h4>{t('changePassword')}</h4>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <FormItem hidden label="email">
          <input {...register('email')} />
        </FormItem>
        <FormItem label={t('currentPassword')} error={errors.oldPassword?.message}>
          <TextInput
            type="password"
            {...register('oldPassword', { required: { value: true, message: t('requiredField') } })}
          />
        </FormItem>
        <FormItem label={t('newPassword')} error={errors.newPassword?.message}>
          <TextInput
            type="password"
            {...register('newPassword', { required: { value: true, message: t('requiredField') } })}
          />
        </FormItem>
        <FormItem label={t('confirmPassword')} error={errors.confirmPassword?.message}>
          <TextInput
            type="password"
            {...register('confirmPassword', {
              required: { value: true, message: t('requiredField') },
              validate: (val, values) => {
                if (val !== values.newPassword) return t('noMatch');
              },
            })}
          />
        </FormItem>
        <Button type="submit" disabled={loading}>
          {t('button')}
        </Button>
        <Feedback type={result?.error ? 'error' : 'success'} message={result?.message as string} />
      </form>
    </div>
  );
}
export default ChangePasswordForm;
