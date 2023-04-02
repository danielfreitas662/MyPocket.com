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

interface CategoryFormProps {
  initialData?: Partial<ICategory>;
}
function CategoryForm({ initialData }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiRequest<ICategory | null>>({} as ApiRequest<ICategory>);
  const router = useRouter();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ICategory>>({ defaultValues: initialData || { name: '', type: 0 } });
  const handleSubmit2 = (values: Partial<ICategory>) => {
    console.log(values);
    setLoading(true);
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
      <form onSubmit={handleSubmit((data) => handleSubmit2(data))}>
        <FormItem label="Id" hidden>
          <input {...register('id', { required: false })} />
        </FormItem>
        <FormItem label="Name" error={errors['name']?.message as string}>
          <TextInput placeholder="Name..." {...register('name', { required: 'Required field' })} />
        </FormItem>
        <FormItem label="Type" error={errors['type']?.message as string}>
          <Select
            allowClear
            control={control}
            placeholder="Category type..."
            {...register('type', { required: 'Required field' })}
            options={[
              { value: 0, label: 'Outcome' },
              { value: 1, label: 'Income' },
            ]}
          />
        </FormItem>
        <Button type="submit" disabled={loading}>
          Save
        </Button>
        <Feedback type={result?.error ? 'error' : 'success'} message={result?.message} dismissable />
      </form>
    </div>
  );
}
export default CategoryForm;
