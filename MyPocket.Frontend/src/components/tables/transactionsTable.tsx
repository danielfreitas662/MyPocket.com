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

function TransactionsTable() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const handleRemove = (id: string) => {
    setLoading(true);
    removeTransaction(id)
      .then((res) => {
        setLoading(false);
        setData((pv) => pv.filter((c) => c.id !== res.data));
        toast.success('Transaction successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  useEffect(() => {
    setLoading(true);
    getTransactions()
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <Table
        rowKey="id"
        dataSource={data}
        scroll={{ x: 1000, y: 200 }}
        loading={loading}
        width={500}
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
