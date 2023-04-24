'use client';

import { saveAccount } from '@/services/api/account';
import { ApiRequest } from '@/types/apirequest';
import { IAccount } from '@/types/account';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../button/button';
import Feedback from '../feedback/feedback';
import FormItem from '../form/formItem';
import TextInput from '../inputComponents/textinput/textInput';
import { useTranslations } from 'next-intl';

interface AccountFormProps {
  initialData?: Partial<IAccount>;
}
function AccountForm({ initialData }: AccountFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiRequest<IAccount | null>>({} as ApiRequest<IAccount>);
  const router = useRouter();
  const t = useTranslations('Accounts');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IAccount>>({ defaultValues: initialData || { name: '' } });

  const handleaAdd = (values: Partial<IAccount>) => {
    setLoading(true);
    setResult({} as ApiRequest<IAccount>);
    saveAccount(values)
      .then((res) => {
        setLoading(false);
        setResult(res);
        router.prefetch('/private/account');
        !values.id && reset();
      })
      .catch((res) => {
        setLoading(false);
        setResult(res);
      });
  };
  return (
    <div style={{ width: 500 }}>
      <form onSubmit={handleSubmit((data) => handleaAdd(data))}>
        <FormItem label="Id" hidden>
          <input {...register('id', { required: false })} />
        </FormItem>
        <FormItem label={t('fields.name')} error={errors['name']?.message as string}>
          <TextInput placeholder={t('fields.name')} {...register('name', { required: t('fields.requiredField') })} />
        </FormItem>
        <Button type="submit" disabled={loading}>
          {t('save')}
        </Button>
        <Feedback type={result?.error ? 'error' : 'success'} message={result?.message} dismissable />
      </form>
    </div>
  );
}
export default AccountForm;
