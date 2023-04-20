'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { PopConfirm, Table } from '@/components';
import { FilterResult, PageSearchParams } from '@/types/pagination';
import { useRouter } from 'next/navigation';
import { ColumnType } from '../table/tableTypes';
import { objectToQueryString } from '@/utils/queryString';
import { IBudget } from '@/types/budget';
import { removeBudget } from '@/services/api/budget';
import { currencyFormat } from '@/utils/formatters';
import moment from 'moment';
interface BudgetsTableProps {
  searchParams: PageSearchParams & IBudget;
  data: FilterResult<IBudget>;
}

function BudgetsTable({ searchParams, data }: BudgetsTableProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRemove = (id: string) => {
    setLoading(true);
    removeBudget(id)
      .then((res) => {
        setLoading(false);
        router.refresh();
        toast.success('Budget successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  const columns: ColumnType<IBudget>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      render: (v: string) => (
        <div style={{ display: 'flex', gap: '5px 5px' }}>
          <Link href={`/private/budget/${v}`}>
            <FaEdit />
          </Link>
          <PopConfirm title="Are you sure?" onConfirm={() => handleRemove(v)}>
            <FaTrash style={{ cursor: 'pointer' }} />
          </PopConfirm>
        </div>
      ),
    },
    {
      title: 'Month',
      dataIndex: 'month',
      filter: {
        filterType: 'string',
        filterValue: searchParams.month,
      },
      render: (v) => moment(v).format('MMM-YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      filter: {
        filterType: 'string',
        filterValue: searchParams.amount,
      },
      render: (v) => currencyFormat(v, 'pt-BR'),
    },
  ];
  return (
    <>
      <ToastContainer />
      <Table
        rowKey="id"
        dataSource={data.results}
        scroll={{ x: '100%', y: 'calc(100vh - 300px)' }}
        loading={loading}
        sorter={{ field: searchParams.field, order: searchParams.order }}
        onChange={(filter, sorter, pagination) => {
          const query = objectToQueryString({ ...filter, ...sorter, ...pagination });
          router.push(`/private/budget?${query}`);
        }}
        pagination={{
          total: data.total,
          pageOptions: [10, 20, 50, 100],
          pageSize: searchParams.pageSize || 10,
          current: searchParams.current,
        }}
        columns={columns}
      />
    </>
  );
}
export default BudgetsTable;
