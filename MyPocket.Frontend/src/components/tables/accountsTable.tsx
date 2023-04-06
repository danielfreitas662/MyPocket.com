'use client';
import { getAccounts, removeAccount } from '@/services/api/account';
import { IAccount } from '@/types/account';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../table/table';
import { PopConfirm } from '@/components';

function AccountsTable() {
  const [data, setData] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const handleRemove = (id: string) => {
    setLoading(true);
    removeAccount(id)
      .then((res) => {
        setLoading(false);
        setData((pv) => pv.filter((c) => c.id !== res.data));
        toast.success('Account successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  useEffect(() => {
    setLoading(true);
    getAccounts()
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
        scroll={{ x: 1000, y: 'calc(100vh - 200px)' }}
        loading={loading}
        width={500}
        columns={[
          {
            title: '',
            dataIndex: 'id',
            render: (v) => (
              <div style={{ display: 'flex', gap: '5px 5px' }}>
                <Link href={`/private/account/${v}`}>
                  <FaEdit />
                </Link>
                <PopConfirm title="Are you sure?" onConfirm={() => handleRemove(v)}>
                  <FaTrash style={{ cursor: 'pointer' }} />
                </PopConfirm>
              </div>
            ),
          },
          {
            title: 'Name',
            dataIndex: 'name',
          },
        ]}
      />
    </>
  );
}
export default AccountsTable;
