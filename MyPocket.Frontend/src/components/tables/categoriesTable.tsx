'use client';
import { getCategories, removeCategory } from '@/services/api/category';
import { CategoryType, ICategory } from '@/types/category';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Table from '../table/table';
import { PopConfirm } from '@/components';

function CategoriesTable() {
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const handleRemove = (id: string) => {
    setLoading(true);
    removeCategory(id)
      .then((res) => {
        setLoading(false);
        setData((pv) => pv.filter((c) => c.id !== res.data));
        toast.success('Category successfully removed!');
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res);
      });
  };
  useEffect(() => {
    setLoading(true);
    getCategories()
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
        pagination={{
          total: data.length,
          pageSize: 10,
        }}
        columns={[
          {
            title: '',
            dataIndex: 'id',
            render: (v) => (
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
          },
          {
            title: 'Type',
            dataIndex: 'type',
            render: (v) => (v === CategoryType.Income ? 'Income' : 'Outcome'),
          },
        ]}
      />
    </>
  );
}
export default CategoriesTable;
