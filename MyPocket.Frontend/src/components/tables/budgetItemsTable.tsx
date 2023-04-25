import { IBudgetItem } from '@/types/budget';
import Table from '../table/table';
import { ColumnType } from '../table/tableTypes';
import { useState } from 'react';
import { removeBudgetItem, updateBudgetItem } from '@/services/api/budget';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaEdit, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import PopConfirm from '../popconfirm/popConfirm';
import { currencyFormat } from '@/utils/formatters';
import CurrencyInput from '../inputComponents/currencyInput/currencyInput';
import { useLocale, useTranslations } from 'next-intl';

interface BudgetItemsTableProps {
  items: IBudgetItem[];
}
function BudgetItemsTable({ items }: BudgetItemsTableProps) {
  const [loading, setLoading] = useState(false);
  const [itemEdit, setitemEdit] = useState<string | null>(null);
  const [valueEdit, setValueEdit] = useState(0);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Budgets');
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
              <PopConfirm title={t('confirm.title')} onConfirm={() => handleRemoveItem(v)}>
                <FaTrash style={{ cursor: 'pointer' }} />
              </PopConfirm>
            </>
          )}
        </div>
      ),
    },
    {
      title: t('fields.category'),
      dataIndex: 'category',
      sorter: (a, b) => a.category?.localeCompare(b.category as string, 'en', { sensitivity: 'base' }) || 0,
    },
    {
      title: t('fields.amount'),
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      dataIndex: 'amount',
      width: 100,
      align: 'right',
      render: (v, row) =>
        itemEdit !== row.id ? (
          currencyFormat(v, locale)
        ) : (
          <CurrencyInput value={valueEdit} onChange={(e) => setValueEdit(e.target.value)} />
        ),
    },
  ];
  return (
    <Table
      dataSource={items}
      rowKey="id"
      columns={columns}
      pagination={false}
      loading={loading}
      scroll={{ x: '100%', y: 800 }}
      summary={(data) => (
        <Table.Summary>
          <Table.Summary.Row style={{ fontWeight: 'bold' }}>
            <Table.Summary.Cell colSpan={2} align="right">
              TOTAL
            </Table.Summary.Cell>
            <Table.Summary.Cell align="right">
              {currencyFormat(
                data.reduce((a, b) => a + b.amount, 0),
                locale
              )}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  );
}
export default BudgetItemsTable;
