import { Skeleton } from '@/components';
import BudgetForm from '@/components/forms/budget/budgetForm';
import { getBudgetById } from '@/services/api/budget';
import { getCategories } from '@/services/category';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';

async function Category({ params }: { params: { id: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getBudgetById(params?.id, session);
  const { data } = await getCategories(session);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? <div>Not found</div> : <BudgetForm initialData={result.data} categories={data} />}
    </Suspense>
  );
}

export default Category;
