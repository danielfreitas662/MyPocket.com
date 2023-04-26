import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { getAllAccounts } from '@/services/api/account';
import { getAllCategories } from '@/services/api/category';
import { getTransactionById } from '@/services/api/transaction';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function Transaction({ params }: { params: { id: string; lang: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getTransactionById(params?.id, session, params.lang);
  const { data: categories } = await getAllCategories(session, params.lang);
  const { data: accounts } = await getAllAccounts(session, params.lang);
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
