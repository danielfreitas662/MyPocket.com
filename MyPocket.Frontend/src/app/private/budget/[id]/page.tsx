import { Skeleton } from '@/components';
import CategoryForm from '@/components/forms/categoryForm';
import { getBudgetById } from '@/services/api/budget';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function Category({ params }: { params: { id: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getBudgetById(params?.id, session);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? <div>Not found</div> : <CategoryForm initialData={result.data} />}
    </Suspense>
  );
}

export default Category;
