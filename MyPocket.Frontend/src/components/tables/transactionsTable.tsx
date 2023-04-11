'use client';
import { getTransactions, removeTransaction } from '@/services/api/transaction';
import { ITransaction } from '@/types/transaction';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { PopConfirm, Table } from '@/components';
import moment from 'moment';
import { currencyFormat } from '@/utils/formaters';
import { FilterResult, PageSearchParams } from '@/types/pagination';
import { useRouter } from 'next/navigation';
import { ColumnType } from '../table/tableTypes';
import { objectToQueryString } from '@/utils/queryString';

function TransactionsTable(props: PageSearchParams & ITransaction) {
  const [data, setData] = useState<FilterResult<ITransaction>>({ current: props.current, total: 0, results: [] });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRemove = (id: string) => {
    setLoading(true);
    removeTransaction(id)
      .then((res) => {
        setLoading(false);
        setData((pv) => ({
          results: pv.results.filter((c) => c.id !== res.data),
          total: pv.total - 1,
          current: pv.current,
        }));
        toast.success('Transaction successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  useEffect(() => {
    setLoading(true);
    getTransactions({
      filters: {
        description: props.description,
        amount: props.amount,
        date: props.date,
        category: props.category,
        account: props.account,
      } as ITransaction,
      pagination: { current: props.current, pageSize: props.pageSize },
      sorter: { field: props.field, order: props.order },
    })
      .then((res) => {
        if (res.data.current != props.current) {
          router.replace(`/private/transaction?${objectToQueryString({ ...props, current: res.data.current })}`);
        }
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [props]);
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
        filterValue: props.date,
      },
      render: (v: string) => moment(v).format('DD/MM/YYYY'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      filter: {
        filterType: 'string',
        filterValue: props.description,
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'right',
      render: (v: number) => currencyFormat(v, 'pt-BR'),
      filter: {
        filterType: 'string',
        filterValue: props.amount,
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filter: {
        filterType: 'string',
        filterValue: props.category,
      },
    },
    {
      title: 'Account',
      dataIndex: 'account',
      filter: {
        filterType: 'string',
        filterValue: props.account,
      },
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
        sorter={{ field: props.field, order: props.order }}
        onChange={(filter, sorter, pagination) => {
          const query = objectToQueryString({ ...filter, ...sorter, ...pagination });
          router.push(`/private/transaction?${query}`);
        }}
        pagination={{
          total: data.total,
          pageOptions: [10, 20, 50, 100],
          pageSize: props.pageSize || 10,
          current: props.current,
        }}
        columns={columns}
      />
    </>
  );
}
export default TransactionsTable;
