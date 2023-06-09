import { Skeleton } from '@/components';
import BudgetForm from '@/components/forms/budget/budgetForm';
import { Suspense } from 'react';

function Budget() {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <BudgetForm />
    </Suspense>
  );
}

export default Budget;
