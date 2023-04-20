'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import Button from '../button/button';
import FormItem from '../form/formItem';
import { IBudget, IBudgetItem } from '@/types/budget';
import { addBudgetItem, removeBudgetItem, saveBudget, updateBudgetItem } from '@/services/api/budget';
import MonthPicker from '../inputComponents/monthPicker/monthPicker';
import moment from 'moment';
import { Col, Row } from '../row/row';
import { ToastContainer, toast } from 'react-toastify';
import Select from '../inputComponents/select/select';
import { CategoryType, ICategory } from '@/types/category';
import { FaArrowDown, FaArrowUp, FaEdit, FaPlus, FaSave, FaStop, FaStopCircle, FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import CurrencyInput from '../inputComponents/currencyInput/currencyInput';
import Table from '../table/table';
import { ColumnType } from '../table/tableTypes';
import { currencyFormat } from '@/utils/formatters';
import Link from 'next/link';
import PopConfirm from '../popconfirm/popConfirm';

interface BudgetFormProps {
  initialData?: Partial<IBudget>;
  categories?: ICategory[];
}
function BudgetForm({ initialData, categories = [] }: BudgetFormProps) {
  const [loading, setLoading] = useState(false);
  const [itemEdit, setitemEdit] = useState<string | null>(null);
  const [valueEdit, setValueEdit] = useState(0);
  const [month, setMonth] = useState<string | null>(
    (moment(initialData?.month).isValid() && moment(initialData?.month).format('MMM-YYYY')) || null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBudgetItem>();
  const router = useRouter();
  const customId = 'custom-id-yes';
  const handleNext = () => {
    if (!month) {
      toast.warn('Select the budget month!', { toastId: customId });
      return;
    }
    setLoading(true);
    saveBudget({ month: moment(month, 'MMM-YYYY').utc().toISOString() }).then((res) => {
      setLoading(false);
      if (res.error) {
        toast.error(res.message, { toastId: 'error' });
      } else {
        router.push(`/private/budget/${res.data?.entity.id}`);
      }
    });
  };
  const handleAddCategory = (data: IBudgetItem) => {
    if (!loading) {
      setLoading(true);
      addBudgetItem({ budgetId: initialData?.id, categoryId: data.categoryId, amount: data.amount })
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
  const handleRemoveItem = (id: string) => {
    setLoading(true);
    removeBudgetItem(id).then((res) => {
      setLoading(false);
      if (!res.error) {
        toast.success(res.message, { toastId: 'success' });
      } else toast.error(res.message, { toastId: 'error' });
      router.refresh();
    });
  };
  const handleUpdateItem = (values: IBudgetItem) => {
    setLoading(true);
    updateBudgetItem({ ...values, amount: valueEdit }).then((res) => {
      if (!res.error) {
        toast.success(res.message, { toastId: 'sucesss' });
      } else toast.error(res.message);
      setLoading(false);
      setitemEdit(null);
      router.refresh();
    });
  };
  const columns: ColumnType<IBudgetItem>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 30,
      render: (v, row) => (
        <div style={{ display: 'flex', gap: '5px 5px' }}>
          {itemEdit !== v && (
            <>
              <FaEdit
                onClick={() => {
                  setitemEdit(v);
                  setValueEdit(row.amount);
                }}
                style={{ cursor: 'pointer' }}
              />
            </>
          )}
          {itemEdit === v && (
            <>
              <FaPlus
                style={{ transform: 'rotate(45deg)', cursor: 'pointer' }}
                onClick={() => {
                  setitemEdit(null);
                }}
              />
              <FaSave style={{ cursor: 'pointer' }} onClick={() => handleUpdateItem(row)} />
              <PopConfirm title="Are you sure?" onConfirm={() => handleRemoveItem(v)}>
                <FaTrash style={{ cursor: 'pointer' }} />
              </PopConfirm>
            </>
          )}
        </div>
      ),
    },
    { title: 'Category', dataIndex: 'category' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
      align: 'right',
      render: (v, row) =>
        itemEdit !== row.id ? (
          currencyFormat(v, 'pt-BR')
        ) : (
          <CurrencyInput value={valueEdit} onChange={(e) => setValueEdit(e.target.value)} />
        ),
    },
  ];
  return (
    <>
      <ToastContainer />
      <Row justifyContent="center" gutter={[10, 10]} wrap>
        <Col flex="1 1 300px">
          <FormItem label="Month">
            <MonthPicker
              placeholder="Month..."
              value={(month && moment(month, 'MMM-YYYY')) || null}
              onChange={(e) => (e.target.value ? setMonth(e.target.value?.format('MMM-YYYY')) : setMonth(null))}
            />
          </FormItem>
          {!initialData?.id && (
            <Button disabled={loading} onClick={handleNext}>
              Next
            </Button>
          )}
          {initialData?.id && (
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
          )}
        </Col>
        {initialData?.id && (
          <Col span={14}>
            <Table
              dataSource={initialData.items}
              rowKey="id"
              columns={columns}
              pagination={false}
              loading={loading}
              scroll={{ x: '100%', y: 800 }}
            />
          </Col>
        )}
      </Row>
    </>
  );
}
export default BudgetForm;
