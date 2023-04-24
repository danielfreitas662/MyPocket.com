'use client';

import { saveCategory } from '@/services/api/category';
import { ApiRequest } from '@/types/apirequest';
import { ICategory } from '@/types/category';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../button/button';
import Feedback from '../feedback/feedback';
import FormItem from '../form/formItem';
import Select from '../inputComponents/select/select';
import TextInput from '../inputComponents/textinput/textInput';
import { useTranslations } from 'next-intl';

interface CategoryFormProps {
  initialData?: Partial<ICategory>;
}
function CategoryForm({ initialData }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiRequest<ICategory | null>>({} as ApiRequest<ICategory>);
  const router = useRouter();
  const t = useTranslations('Categories');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ICategory>>({ defaultValues: initialData || { name: '', type: 1 } });
  const handleaAdd = (values: Partial<ICategory>) => {
    setLoading(true);
    setResult({} as ApiRequest<ICategory>);
    saveCategory(values)
      .then((res) => {
        setLoading(false);
        setResult(res);
        reset();
        router.prefetch('/private/category');
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
        <FormItem label={t('fields.type')} error={errors['type']?.message as string}>
          <Select
            allowClear
            placeholder={t('fields.type')}
            {...register('type', { required: t('fields.requiredField') })}
            options={[
              { value: 0, label: t('fields.income') },
              { value: 1, label: t('fields.expenses') },
            ]}
          />
        </FormItem>
        <Button type="submit" disabled={loading}>
          {t('save')}
        </Button>
        <Feedback type={result?.error ? 'error' : 'success'} message={result?.message} dismissable />
      </form>
    </div>
  );
}
export default CategoryForm;
