'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { PopConfirm, Table } from '@/components';
import { FilterResult, PageSearchParams } from '@/types/pagination';
import { useRouter } from 'next/navigation';
import { ColumnType } from '../table/tableTypes';
import { objectToQueryString } from '@/utils/queryString';
import { CategoryType, ICategory } from '@/types/category';
import { removeCategory } from '@/services/api/category';
import { useTranslations } from 'next-intl';

interface CategoriesTableProps {
  searchParams: PageSearchParams & ICategory;
  data: FilterResult<ICategory>;
}
function CategoriasTable({ searchParams, data }: CategoriesTableProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('Categories');
  const handleRemove = (id: string) => {
    setLoading(true);
    removeCategory(id)
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
  const columns: ColumnType<ICategory>[] = [
    {
      title: '',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      render: (v: string) => (
        <div style={{ display: 'flex', gap: '5px 5px' }}>
          <Link href={`/private/category/${v}`}>
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
    },
    {
      title: t('fields.type'),
      dataIndex: 'type',
      filter: {
        filterType: 'string',
        filterValue: searchParams.type,
      },
      render: (v) => (v === CategoryType.Income ? t('fields.income') : t('fields.expenses')),
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
          router.push(`/private/category?${query}`);
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
export default CategoriasTable;
