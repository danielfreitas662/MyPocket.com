import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { Suspense } from 'react';

function Transaction() {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <TransactionForm initialData={{ categoryId: '', accountId: '' }} />
    </Suspense>
  );
}

export default Transaction;
