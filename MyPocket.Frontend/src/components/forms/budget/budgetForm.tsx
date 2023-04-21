'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../button/button';
import FormItem from '../../form/formItem';
import { IBudget } from '@/types/budget';
import { getBudgetByMonth, saveBudget } from '@/services/api/budget';
import MonthPicker from '../../inputComponents/monthPicker/monthPicker';
import moment from 'moment';
import { Col, Row } from '../../row/row';
import { ToastContainer, toast } from 'react-toastify';
import { ICategory } from '@/types/category';
import BudgetItemsTable from '@/components/tables/budgetItemsTable';
import BudgetItemForm from './budgetItemForm';

interface BudgetFormProps {
  initialData?: Partial<IBudget>;
  categories?: ICategory[];
}
function BudgetForm({ initialData, categories = [] }: BudgetFormProps) {
  const [month, setMonth] = useState<string | null>(
    (moment(initialData?.month).isValid() && moment(initialData?.month).format('MMM-YYYY')) || null
  );
  const router = useRouter();
  const updateBudget = async (newMonth: moment.Moment) => {
    const { data } = await getBudgetByMonth(newMonth.utc().format());
    if (!data) {
      saveBudget({ month: newMonth.utc().toISOString(), id: '' }).then((res) =>
        router.replace('/private/budget/' + res.data?.entity.id)
      );
    } else {
      router.push(`/private/budget/${data.id}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <Row justifyContent="center" gutter={[10, 10]} wrap>
        <Col flex="1 1 300px">
          <FormItem label="Month">
            <MonthPicker
              placeholder="Month..."
              value={(month && moment(month, 'MMM-YYYY')) || null}
              onChange={(e) => {
                e.target.value ? setMonth(e.target.value?.format('MMM-YYYY')) : setMonth(null);
                updateBudget(moment(e.target.value));
              }}
            />
          </FormItem>
          {initialData?.id && (
            <BudgetItemForm
              budgetId={initialData.id}
              categories={categories}
              addedCategories={initialData.items || []}
            />
          )}
        </Col>
        {initialData?.id && (
          <Col span={14}>
            <BudgetItemsTable items={initialData?.items || []} />
          </Col>
        )}
      </Row>
    </>
  );
}
export default BudgetForm;
