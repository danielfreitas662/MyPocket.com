import { Skeleton } from '@/components';
import CategoryForm from '@/components/forms/categoryForm';
import { Suspense } from 'react';

function Budget() {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <CategoryForm />
    </Suspense>
  );
}

export default Budget;
