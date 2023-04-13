import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { getAccounts } from '@/services/account';
import { getCategories } from '@/services/category';
import { getTransactionById } from '@/services/transaction';
import { currencyFormat } from '@/utils/formatters';
import { Suspense } from 'react';

async function Transaction({ params }: { params: { id: string } }) {
  const result = await getTransactionById(params?.id);
  const { data: categories } = await getCategories();
  const { data: accounts } = await getAccounts();
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
