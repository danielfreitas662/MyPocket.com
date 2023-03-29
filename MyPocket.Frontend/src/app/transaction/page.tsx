'use client';
import { Table } from 'components';
import { ColumnType } from 'components/table/table';
import { IUser } from 'types/user';
import styles from './page.module.scss';

function Transaction() {
  const columns: ColumnType<IUser>[] = [
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', width: 100 },
    { title: 'Email', dataIndex: 'email' },
  ];
  return (
    <div className={styles.body}>
      <Table
        onChange={(a, b) => console.log(a, b)}
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
    </div>
  );
}
export default Transaction;
