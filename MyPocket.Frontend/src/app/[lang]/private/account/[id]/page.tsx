import { Skeleton } from '@/components';
import AccountForm from '@/components/forms/accountForm';
import { getAccountById } from '@/services/api/account';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function Account({ params }: { params: { id: string; lang: string } }) {
  const session = cookies().get('session')?.value;
  const result = await getAccountById(params?.id, session, params.lang);
  if (!result.data) {
    return notFound();
  }
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <AccountForm initialData={result.data} />
    </Suspense>
  );
}

export default Account;
