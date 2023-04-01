import { Skeleton } from '@/components';
import CategoryForm from '@/components/forms/categoryForm';
import { getCategoryById } from '@/services/category';
import { Suspense } from 'react';

async function Category({ params }: { params: { id: string } }) {
  const result = await getCategoryById(params?.id);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? <div>Not found</div> : <CategoryForm initialData={result.data} />}
    </Suspense>
  );
}

export default Category;
