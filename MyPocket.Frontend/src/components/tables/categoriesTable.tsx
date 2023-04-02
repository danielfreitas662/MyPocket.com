'use client';
import { CategoryType, ICategory } from '@/types/category';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Table from '../table/table';

function CategoriesTable({ data = [] }: { data: ICategory[] }) {
  return (
    <Table
      rowKey="id"
      dataSource={data}
      width={500}
      columns={[
        {
          title: '',
          dataIndex: 'id',
          render: (v) => (
            <div style={{ display: 'flex', gap: '5px 5px' }}>
              <Link href={`/private/category/${v}`}>
                <FaEdit />
              </Link>
              <FaTrash style={{ cursor: 'pointer' }} />
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
  );
}
export default CategoriesTable;
