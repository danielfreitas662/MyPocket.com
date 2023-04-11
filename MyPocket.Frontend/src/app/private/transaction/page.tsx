import TransactionsTable from '@/components/tables/transactionsTable';
import { PageSearchParams } from '@/types/pagination';
import { ITransaction } from '@/types/transaction';

export const metadata = {
  title: 'MyPocket - Transactions',
};
interface PageProps {
  searchParams: PageSearchParams & ITransaction;
}
function Transaction({ searchParams }: PageProps) {
  return <TransactionsTable {...searchParams} />;
}
export default Transaction;
