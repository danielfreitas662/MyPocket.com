import TransactionsTable from '@/components/tables/transactionsTable';
import { getTransactions } from '@/services/api/transaction';
import { PageSearchParams } from '@/types/pagination';
import { ITransaction } from '@/types/transaction';
import { cookies } from 'next/headers';

interface PageProps {
  searchParams: PageSearchParams & ITransaction;
}
async function Transaction({ searchParams }: PageProps) {
  const session = cookies().get('session')?.value;
  const { data } = await getTransactions(
    {
      filters: {
        description: searchParams.description,
        amount: searchParams.amount,
        date: searchParams.date,
        category: searchParams.category,
        account: searchParams.account,
      } as ITransaction,
      pagination: { current: searchParams.current, pageSize: searchParams.pageSize },
      sorter: { field: searchParams.field, order: searchParams.order },
    },
    session
  );
  return <TransactionsTable searchParams={searchParams} data={data} />;
}
export default Transaction;
