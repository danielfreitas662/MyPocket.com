import TransactionsTable from '@/components/tables/transactionsTable';
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    current: number;
    pageSize: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
  };
}
function Transaction({ params }: PageProps) {
  return <TransactionsTable {...params} />;
}
export default Transaction;
