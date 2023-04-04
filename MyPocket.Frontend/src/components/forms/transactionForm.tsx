'use client';

import { ApiRequest } from '@/types/apirequest';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../button/button';
import Feedback from '../feedback/feedback';
import FormItem from '../form/formItem';
import TextInput from '../inputComponents/textinput/textInput';
import Select from '../inputComponents/select/select';
import { ITransaction } from '@/types/transaction';
import { saveTransaction } from '@/services/api/transaction';
import { ICategory } from '@/types/category';
import { IAccount } from '@/types/account';
import { getCategories } from '@/services/api/category';
import { getAccounts } from '@/services/api/account';
import DatePicker from '../inputComponents/datePicker/datePicker';
import CurrencyInput from '../inputComponents/currencyInput/currencyInput';
import { currencyNormalize } from '@/utils/formaters';
import moment from 'moment';

export interface TransactionData extends Omit<ITransaction, 'amount'> {
  amount: string;
}
interface TransactionFormProps {
  initialData?: Partial<TransactionData>;
}
function TransactionForm({ initialData }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiRequest<ITransaction | null>>({} as ApiRequest<ITransaction>);
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionData>({ defaultValues: initialData || { description: '' } });
  const handleaAdd = (values: Partial<TransactionData>) => {
    setLoading(true);
    setResult({} as ApiRequest<ITransaction>);

    saveTransaction({ ...values, amount: currencyNormalize(values.amount), date: moment(values.date).utc() })
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
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getAccounts().then((res) => setAccounts(res.data));
  }, []);
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
          <CurrencyInput placeholder="Amount..." {...register('amount', { required: 'Required field' })} />
        </FormItem>
        <FormItem label="Date" error={errors['date']?.message as string}>
          <DatePicker placeholder="Date..." {...register('date', { required: 'Required field' })} />
        </FormItem>
        <FormItem label="Category" error={errors['categoryId']?.message as string}>
          <Select
            allowClear
            control={control}
            placeholder="Category..."
            {...register('categoryId', { required: 'Required field' })}
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
          />
        </FormItem>
        <FormItem label="Account" error={errors['accountId']?.message as string}>
          <Select
            allowClear
            control={control}
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
