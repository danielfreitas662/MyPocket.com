'use client';
import { removeTransaction } from '@/services/api/transaction';
import { ITransaction } from '@/types/transaction';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { PopConfirm, Table } from '@/components';
import moment from 'moment';
import { currencyFormat } from '@/utils/formatters';
import { FilterResult, PageSearchParams } from '@/types/pagination';
import { useRouter } from 'next/navigation';
import { ColumnType } from '../table/tableTypes';
import { objectToQueryString } from '@/utils/queryString';

interface TransactionsTableProps {
  searchParams: PageSearchParams & ITransaction;
  data: FilterResult<ITransaction>;
}
function TransactionsTable(props: TransactionsTableProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRemove = (id: string) => {
    setLoading(true);
    removeTransaction(id)
      .then(() => {
        setLoading(false);
        router.refresh();
        toast.success('Transaction successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };

  const columns: ColumnType<ITransaction>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      render: (v: string) => (
        <div style={{ display: 'flex', gap: '5px 5px' }}>
          <Link href={`/private/transaction/${v}`}>
            <FaEdit />
          </Link>
          <PopConfirm title="Are you sure?" onConfirm={() => handleRemove(v)}>
            <FaTrash style={{ cursor: 'pointer' }} />
          </PopConfirm>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      filter: {
        filterType: 'date',
        filterValue: props.searchParams.date,
      },
      render: (v: string) => moment(v).format('DD/MM/YYYY'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      filter: {
        filterType: 'string',
        filterValue: props.searchParams.description,
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'right',
      render: (v: number) => currencyFormat(v, 'pt-BR'),
      filter: {
        filterType: 'string',
        filterValue: props.searchParams.amount,
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filter: {
        filterType: 'string',
        filterValue: props.searchParams.category,
      },
    },
    {
      title: 'Account',
      dataIndex: 'account',
      filter: {
        filterType: 'string',
        filterValue: props.searchParams.account,
      },
    },
  ];
  return (
    <>
      <ToastContainer />
      <Table
        rowKey="id"
        dataSource={props.data.results}
        scroll={{ x: 700, y: 'calc(100vh - 300px)' }}
        loading={loading}
        sorter={{ field: props.searchParams.field, order: props.searchParams.order }}
        onChange={(filter, sorter, pagination) => {
          const query = objectToQueryString({ ...filter, ...sorter, ...pagination });
          router.push(`/private/transaction?${query}`);
        }}
        pagination={{
          total: props.data.total,
          pageOptions: [10, 20, 50, 100],
          pageSize: props.searchParams.pageSize || 10,
          current: props.searchParams.current,
        }}
        columns={columns}
      />
    </>
  );
}
export default TransactionsTable;
