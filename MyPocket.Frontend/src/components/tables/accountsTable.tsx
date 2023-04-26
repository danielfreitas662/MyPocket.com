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
import { IAccount } from '@/types/account';
import { removeAccount } from '@/services/api/account';
import { useTranslations } from 'next-intl';
interface AccountsTableProps {
  searchParams: PageSearchParams & IAccount;
  data: FilterResult<IAccount>;
}

function AccountsTable({ searchParams, data }: AccountsTableProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('Accounts');
  const handleRemove = (id: string) => {
    setLoading(true);
    removeAccount(id)
      .then((res) => {
        setLoading(false);
        router.refresh();
        toast.success(t('successRemove'));
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  const columns: ColumnType<IAccount>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      render: (v: string) => (
        <div style={{ display: 'flex', gap: '5px 5px' }}>
          <Link href={`/private/account/${v}`}>
            <FaEdit />
          </Link>
          <PopConfirm title={t('confirm.title')} onConfirm={() => handleRemove(v)}>
            <FaTrash style={{ cursor: 'pointer' }} />
          </PopConfirm>
        </div>
      ),
    },
    {
      title: t('fields.name'),
      dataIndex: 'name',
      filter: {
        filterType: 'string',
        filterValue: searchParams.name,
      },
      sorter: true,
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
          router.push(`/private/account?${query}`);
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
export default AccountsTable;
