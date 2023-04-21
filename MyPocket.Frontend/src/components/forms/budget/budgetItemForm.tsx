import { Button, CurrencyInput, Select } from '@/components';
import FormItem from '@/components/form/formItem';
import { addBudgetItem } from '@/services/api/budget';
import { IBudgetItem } from '@/types/budget';
import { CategoryType, ICategory } from '@/types/category';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

function BudgetItemForm({ categories, budgetId }: { categories: ICategory[]; budgetId: string }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBudgetItem>();
  const router = useRouter();
  const handleAddCategory = (data: IBudgetItem) => {
    if (!loading) {
      setLoading(true);
      addBudgetItem({ budgetId: budgetId, categoryId: data.categoryId, amount: data.amount })
        .then((res) => {
          setLoading(false);
          if (res.error) {
            toast.error(res.message, { toastId: 'error' });
          } else toast.success(res.message, { toastId: 'success' });
          router.refresh();
        })
        .catch((res) => {
          setLoading(false);
          toast.error(res.message, { toastId: 'error' });
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddCategory)}>
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
      <FormItem label="Amount" error={errors['amount']?.message as string}>
        <CurrencyInput
          {...register('amount', {
            required: { value: true, message: 'Required field' },
            validate: (val) => val !== 0 || 'Value must be greater than zero',
          })}
        />
      </FormItem>
      <Button type="submit" icon={<FaPlus />}>
        Budget Item
      </Button>
    </form>
  );
}
export default BudgetItemForm;
