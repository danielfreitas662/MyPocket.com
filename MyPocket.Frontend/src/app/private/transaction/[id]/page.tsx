import { Skeleton } from '@/components';
import TransactionForm from '@/components/forms/transactionForm';
import { getAccountById } from '@/services/account';
import { getTransactionById } from '@/services/transaction';
import { currencyFormat } from '@/utils/formaters';
import { Suspense } from 'react';

async function Transaction({ params }: { params: { id: string } }) {
  const result = await getTransactionById(params?.id);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? (
        <div>Not found</div>
      ) : (
        <TransactionForm initialData={{ ...result.data, amount: currencyFormat(result.data.amount, 'pt-BR') }} />
      )}
    </Suspense>
  );
}

export default Transaction;
