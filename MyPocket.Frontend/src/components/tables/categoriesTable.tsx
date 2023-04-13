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
import { removeCategory, getCategories } from '@/services/api/category';

function CategoriasTable(props: PageSearchParams & ICategory) {
  const [data, setData] = useState<FilterResult<ICategory>>({ current: props.current, total: 0, results: [] });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRemove = (id: string) => {
    setLoading(true);
    removeCategory(id)
      .then((res) => {
        setLoading(false);
        setData((pv) => ({
          results: pv.results.filter((c) => c.id !== res.data),
          total: pv.total - 1,
          current: pv.current,
        }));
        toast.success('Category successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  useEffect(() => {
    setLoading(true);
    getCategories({
      filters: {
        name: props.name,
      } as ICategory,
      pagination: { current: props.current, pageSize: props.pageSize },
      sorter: { field: props.field, order: props.order },
    })
      .then((res) => {
        if (res.data.current != props.current) {
          router.replace(`/private/category?${objectToQueryString({ ...props, current: res.data.current })}`);
        }
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [props]);
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
          <PopConfirm title="Are you sure?" onConfirm={() => handleRemove(v)}>
            <FaTrash style={{ cursor: 'pointer' }} />
          </PopConfirm>
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filter: {
        filterType: 'string',
        filterValue: props.name,
      },
    },
    {
      title: 'Categoty Type',
      dataIndex: 'type',
      filter: {
        filterType: 'string',
        filterValue: props.type,
      },
      render: (v) => (v === CategoryType.Income ? 'Income' : 'Expense'),
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
          router.push(`/private/category?${query}`);
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
export default CategoriasTable;
