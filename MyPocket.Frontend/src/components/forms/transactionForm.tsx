'use client';

import { ApiRequest } from '@/types/apirequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Feedback from '../feedback/feedback';
import { ITransaction } from '@/types/transaction';
import { saveTransaction } from '@/services/api/transaction';
import { CategoryType, ICategory } from '@/types/category';
import { IAccount } from '@/types/account';
import moment from 'moment';
import Button from '../button/button';
import FormItem from '../form/formItem';
import CurrencyInput from '../inputComponents/currencyInput/currencyInput';
import DatePicker from '../inputComponents/datePicker/datePicker';
import Select from '../inputComponents/select/select';
import TextInput from '../inputComponents/textinput/textInput';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface TransactionFormProps {
  initialData?: Partial<ITransaction>;
  categories: ICategory[];
  accounts: IAccount[];
}
function TransactionForm({ initialData, categories, accounts }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiRequest<ITransaction | null>>({} as ApiRequest<ITransaction>);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITransaction>({
    defaultValues: initialData,
  });
  const handleaAdd = (values: Partial<ITransaction>) => {
    setLoading(true);
    setResult({} as ApiRequest<ITransaction>);
    saveTransaction({ ...values, date: moment(values.date).utc() })
      .then((res) => {
        setLoading(false);
        setResult(res);
        router.prefetch('/private/transaction');
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
        <FormItem label="Description" error={errors['description']?.message as string}>
          <TextInput placeholder="Description..." {...register('description', { required: 'Required field' })} />
        </FormItem>
        <FormItem label="Amount" error={errors['amount']?.message as string}>
          <CurrencyInput
            placeholder="Amount..."
            {...register('amount', {
              required: 'Required field',
              validate: (val) => {
                return val !== 0 || 'Amount cannot be zero';
              },
            })}
          />
        </FormItem>
        <FormItem label="Date" error={errors['date']?.message as string}>
          <DatePicker {...register('date', { required: 'Required field' })} placeholder="Date..." />
        </FormItem>
        <FormItem label="Category" error={errors['categoryId']?.message as string}>
          <Select
            allowClear
            placeholder="Category..."
            {...register('categoryId', { required: 'Required field' })}
            renderItem={(item) => (
              <div
                style={{
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  gap: '8px',
                }}
              >
                <div>{item.label}</div>
                <div>
                  {categories.find((c) => c.id === item.value)?.type === CategoryType.Income ? (
                    <FaArrowDown color="blue" />
                  ) : (
                    <FaArrowUp color="red" />
                  )}
                </div>
              </div>
            )}
            options={categories
              .sort((a, b) => a.type - b.type)
              .map((c) => ({
                value: c.id,
                label: c.name,
              }))}
          />
        </FormItem>
        <FormItem label="Account" error={errors['accountId']?.message as string}>
          <Select
            allowClear
            placeholder="Account..."
            {...register('accountId', { required: 'Required field' })}
            options={accounts.map((c) => ({ value: c.id, label: c.name }))}
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
export default TransactionForm;
