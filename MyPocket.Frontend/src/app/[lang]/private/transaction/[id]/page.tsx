import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { getAccounts } from '@/services/account';
import { getCategories } from '@/services/category';
import { getTransactionById } from '@/services/transaction';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function Transaction({ params }: { params: { id: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getTransactionById(params?.id, session);
  const { data: categories } = await getCategories(session);
  const { data: accounts } = await getAccounts(session);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? (
        <div>Not found</div>
      ) : (
        <TransactionForm categories={categories} accounts={accounts} initialData={{ ...result.data }} />
      )}
    </Suspense>
  );
}

export default Transaction;
