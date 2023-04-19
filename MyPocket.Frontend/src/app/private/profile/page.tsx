import { Descriptions } from '@/components';
import ChangePasswordForm from '@/components/forms/changePasswordForm';
import { getUser } from '@/services/api/user';
import { cookies } from 'next/headers';

async function Profile() {
  const session = cookies().get('session')?.value;
  const user = await getUser(session);
  if (!user) return <div>Not Authenticated</div>;
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="E-mail">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="First Name">{user?.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user?.lastName}</Descriptions.Item>
      </Descriptions>
      <h4>Change Password</h4>
      <ChangePasswordForm email={user?.email} />
    </div>
  );
}
export default Profile;
