import styles from './page.module.scss';
import TransactionsTable from './transactionsTable';
export const dynamic = 'force-dynamic';
function Transaction({ searchParams }: any) {
  console.log(searchParams);
  return (
    <div className={styles.body}>
      <TransactionsTable />
    </div>
  );
}
export default Transaction;
