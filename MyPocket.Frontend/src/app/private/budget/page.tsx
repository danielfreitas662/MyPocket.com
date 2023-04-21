import { PageSearchParams } from '@/types/pagination';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { Skeleton } from '@/components';
import BudgetsTable from '@/components/tables/budgetsTable';
import { IBudget } from '@/types/budget';
import { getBudgets } from '@/services/api/budget';

interface PageProps {
  searchParams: PageSearchParams & IBudget;
}
async function Budget({ searchParams }: PageProps) {
  const session = cookies().get('session')?.value;
  const { data } = await getBudgets(
    {
      filters: {
        month: searchParams.month,
      } as IBudget,
      pagination: { current: searchParams.current, pageSize: searchParams.pageSize },
      sorter: { field: searchParams.field, order: searchParams.order },
    },
    session
  );
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <BudgetsTable searchParams={searchParams} data={data} />
    </Suspense>
  );
}
export default Budget;
