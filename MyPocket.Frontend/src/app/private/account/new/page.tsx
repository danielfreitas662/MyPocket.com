import { Skeleton } from '@/components';
import AccountForm from '@/components/forms/accountForm';
import { Suspense } from 'react';

function Account() {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <AccountForm />
    </Suspense>
  );
}

export default Account;
