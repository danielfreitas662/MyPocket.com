import TransactionsTable from '@/components/tables/transactionsTable';
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    current: number;
    pageSize: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
  };
}
function Transaction({ searchParams }: PageProps) {
  return <TransactionsTable {...searchParams} />;
}
export default Transaction;
