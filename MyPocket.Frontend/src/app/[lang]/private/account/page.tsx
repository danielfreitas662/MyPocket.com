import AccountsTable from '@/components/tables/accountsTable';
import { getAccounts } from '@/services/api/account';
import { IAccount } from '@/types/account';
import { PageSearchParams } from '@/types/pagination';
import { cookies } from 'next/headers';
import { defaultLocale } from '../../../../../i18n';
import { useLocale } from 'next-intl';

interface PageProps {
  searchParams: PageSearchParams & IAccount;
  params: {
    lang: string;
  };
}
async function Account({ searchParams, params }: PageProps) {
  const session = cookies().get('session')?.value;
  const { data } = await getAccounts(
    {
      filters: {
        name: searchParams.name,
      } as IAccount,
      pagination: { current: searchParams.current, pageSize: searchParams.pageSize },
      sorter: { field: searchParams.field, order: searchParams.order },
    },
    session,
    params.lang
  );
  return <AccountsTable searchParams={searchParams} data={data} />;
}

export default Account;
