'use client';
import { useUser } from 'context/userContext';
import UnauthHome from './home';
import Dashboard from './dashboard/page';

const Home = () => {
  const { user, fetching } = useUser();
  if (fetching) return <div>Loading...</div>;
  if (user) return <Dashboard />;
  return <UnauthHome />;
};

export default Home;
