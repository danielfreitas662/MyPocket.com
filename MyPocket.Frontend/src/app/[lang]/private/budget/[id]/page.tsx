import { Skeleton } from '@/components';
import BudgetForm from '@/components/forms/budget/budgetForm';
import { getBudgetById } from '@/services/api/budget';
import { getAllCategories } from '@/services/api/category';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

async function Category({ params }: { params: { id: string; lang: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getBudgetById(params?.id, session, params.lang);
  const { data } = await getAllCategories(session, params.lang);
  if (!result.data) return notFound();
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <BudgetForm initialData={result.data} categories={data} />
    </Suspense>
  );
}

export default Category;
