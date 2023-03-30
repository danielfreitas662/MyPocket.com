'use client';

import { Table } from '@/components';
import { ColumnType } from '@/components/table/table';
import { IUser } from '@/types/user';
import { useRouter } from 'next/navigation';

export default function TransactionsTable() {
  const router = useRouter();
  const columns: ColumnType<IUser>[] = [
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', width: 100 },
    { title: 'Email', dataIndex: 'email' },
  ];
  return (
    <Table
      onChange={(a, b) => router.push(`/transactions?sorter=${1}`)}
      dataSource={[
        {
          id: 1,
          firstName: 'Daniel niudneunde dneiudneiud denidune',
          lastName: 'Freitas',
          email: 'jhgg@hbjhgbhjjn.com',
        },
        { id: 2, firstName: 'Diogo', lastName: 'Araujo', email: 'jhgg@hbjhgbhjjn.com' },
        { id: 3, firstName: 'Diogo', lastName: 'Araujo', email: 'jhgg@hbjhgbhjjn.com' },
        { id: 4, firstName: 'Diogo', lastName: 'Araujo', email: 'jhgg@hbjhgbhjjn.com' },
        { id: 5, firstName: 'Diogo', lastName: 'Araujo', email: 'jhgg@hbjhgbhjjn.com' },
        { id: 6, firstName: 'Diogo', lastName: 'Araujo', email: 'jhgg@hbjhgbhjjn.com' },
      ]}
      rowKey="id"
      columns={columns}
    />
  );
}
