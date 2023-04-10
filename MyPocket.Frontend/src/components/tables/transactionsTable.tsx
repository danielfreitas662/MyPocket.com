'use client';
import { getTransactions, removeTransaction } from '@/services/api/transaction';
import { ITransaction } from '@/types/transaction';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../table/table';
import { PopConfirm } from '@/components';
import moment from 'moment';
import { currencyFormat } from '@/utils/formaters';
import { FilterResult } from '@/types/pagination';
import { useRouter } from 'next/navigation';

interface TransactionsTableProps {
  current: number;
  pageSize: number;
  sortOrder: 'asc' | 'desc';
  sortField: string;
}
function TransactionsTable(props: TransactionsTableProps) {
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
      filter: {} as ITransaction,
      pagination: { current: props.current, pageSize: props.pageSize },
      sorter: { field: props.sortField, order: props.sortOrder },
    })
      .then((res) => {
        if (res.data.current != props.current) {
          router.replace(
            `/private/transaction?current=${res.data.current}&pageSize=${props.pageSize}&sortField=${props.sortField}&sortOrder=${props.sortOrder}`
          );
        }
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [props]);

  return (
    <>
      <ToastContainer />
      <Table
        rowKey="id"
        dataSource={data.results}
        scroll={{ x: '100%', y: 'calc(100vh - 300px)' }}
        loading={loading}
        sorter={{ field: props.sortField, order: props.sortOrder }}
        onChange={(sorter, pagination) =>
          router.push(
            `/private/transaction?current=${pagination.current}&pageSize=${pagination.pageSize}&sortField=${sorter.field}&sortOrder=${sorter.order}`
          )
        }
        pagination={{
          total: data.total,
          pageOptions: [10, 20, 50, 100],
          pageSize: props.pageSize || 10,
          current: props.current,
        }}
        columns={[
          {
            title: '',
            dataIndex: 'id',
            render: (v) => (
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
            render: (v) => moment(v).format('DD/MM/YYYY'),
          },
          {
            title: 'Description',
            dataIndex: 'description',
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            align: 'right',
            render: (v) => currencyFormat(v, 'pt-BR'),
          },
          {
            title: 'Category',
            dataIndex: 'category',
          },
          {
            title: 'Account',
            dataIndex: 'account',
          },
        ]}
      />
    </>
  );
}
export default TransactionsTable;
