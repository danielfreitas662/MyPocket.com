import { Skeleton } from '@/components';
import CategoryForm from '@/components/forms/categoryForm';
import { getCategoryById } from '@/services/api/category';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function Category({ params }: { params: { id: string; lang: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getCategoryById(params?.id, session, params.lang);
  if (!result.data) return notFound();
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <CategoryForm initialData={result.data} />
    </Suspense>
  );
}

export default Category;
