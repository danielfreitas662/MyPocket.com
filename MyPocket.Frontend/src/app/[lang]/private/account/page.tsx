import AccountsTable from '@/components/tables/accountsTable';
import { getAccounts } from '@/services/api/account';
import { IAccount } from '@/types/account';
import { PageSearchParams } from '@/types/pagination';
import { cookies } from 'next/headers';

interface PageProps {
  searchParams: PageSearchParams & IAccount;
}
async function Account({ searchParams }: PageProps) {
  const session = cookies().get('session')?.value;
  const { data } = await getAccounts(
    {
      filters: {
        name: searchParams.name,
      } as IAccount,
      pagination: { current: searchParams.current, pageSize: searchParams.pageSize },
      sorter: { field: searchParams.field, order: searchParams.order },
    },
    session
  );
  return <AccountsTable searchParams={searchParams} data={data} />;
}
export default Account;
