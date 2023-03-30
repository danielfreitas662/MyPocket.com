import { getSession } from '@/services/api';
import UnauthHome from './home';
import Dashboard from './private/dashboard/page';

export default async function Home() {
  const data = await getSession();
  const { user } = data;
  if (user) {
    return <Dashboard />;
  } else return <UnauthHome />;
}
