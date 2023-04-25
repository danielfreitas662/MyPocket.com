import ChangePasswordForm from '@/components/forms/changePasswordForm';
import { getUser } from '@/services/api/user';
import { cookies } from 'next/headers';
import UserData from './userData';

async function Profile() {
  const session = cookies().get('session')?.value;
  const user = await getUser(session);
  if (!user) return <div>Not Authenticated</div>;
  return (
    <div>
      <UserData user={user} />
      <ChangePasswordForm email={user?.email} />
    </div>
  );
}
export default Profile;
