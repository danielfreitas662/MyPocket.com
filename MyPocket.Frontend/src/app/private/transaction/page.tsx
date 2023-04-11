import TransactionsTable from '@/components/tables/transactionsTable';
import { PageSearchParams } from '@/types/pagination';
import { ITransaction } from '@/types/transaction';

interface PageProps {
  searchParams: PageSearchParams & ITransaction;
}
function Transaction({ searchParams }: PageProps) {
  return <TransactionsTable {...searchParams} />;
}
export default Transaction;
