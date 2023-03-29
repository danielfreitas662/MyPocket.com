import { PageTitle, Table } from 'components';
import { ColumnType } from 'components/table/table';
import { IUser } from 'types/user';
import styles from './page.module.scss';

function Transaction() {
  const columns: ColumnType<IUser>[] = [
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName' },
  ];
  return (
    <div className={styles.body}>
      <PageTitle>Transactions</PageTitle>
      <Table
        dataSource={[
          { id: 1, firstName: 'Daniel', lastName: 'Freitas' },
          { id: 2, firstName: 'Diogo', lastName: 'Araujo' },
        ]}
        rowKey="id"
        columns={columns}
      />
    </div>
  );
}
export default Transaction;
