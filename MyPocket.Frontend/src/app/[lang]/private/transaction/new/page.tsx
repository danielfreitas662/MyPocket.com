import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { getAccounts } from '@/services/account';
import { getCategories } from '@/services/category';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function Transaction() {
  const session = cookies().get('session')?.value;
  const [categories, accounts] = await Promise.all([getCategories(session), getAccounts(session)]);
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
