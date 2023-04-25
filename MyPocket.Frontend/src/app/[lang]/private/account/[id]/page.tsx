import { Skeleton } from '@/components';
import AccountForm from '@/components/forms/accountForm';
import { getAccountById } from '@/services/account';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

async function Account({ params }: { params: { id: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getAccountById(params?.id, session);
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      {!result.data ? <div>Not found</div> : <AccountForm initialData={result.data} />}
    </Suspense>
  );
}

export default Account;
