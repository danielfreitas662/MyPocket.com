import { Skeleton } from '@/components';
import AccountForm from '@/components/forms/accountForm';
import { getAccountById } from '@/services/account';
import { Suspense } from 'react';

async function Account({ params }: { params: { id: string } }) {
  const result = await getAccountById(params?.id);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? <div>Not found</div> : <AccountForm initialData={result.data} />}
    </Suspense>
  );
}

export default Account;
