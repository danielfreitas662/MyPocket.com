import AccountsTable from '@/components/tables/accountsTable';
import { IAccount } from '@/types/account';
import { PageSearchParams } from '@/types/pagination';

export const metadata = {
  title: 'MyPocket - Accounts',
};
interface PageProps {
  searchParams: PageSearchParams & IAccount;
}
function Account({ searchParams }: PageProps) {
  return <AccountsTable {...searchParams} />;
}
export default Account;
