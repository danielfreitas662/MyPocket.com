import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { getAllAccounts } from '@/services/api/account';
import { getAllCategories } from '@/services/api/category';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function Transaction({ params }: { params: { lang: string } }) {
  const session = cookies().get('session')?.value;
  const [categories, accounts] = await Promise.all([
    getAllCategories(session, params.lang),
    getAllAccounts(session, params.lang),
  ]);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <TransactionForm
        categories={categories.data}
        accounts={accounts.data}
        initialData={{ categoryId: '', accountId: '' }}
      />
    </Suspense>
  );
}

export default Transaction;
