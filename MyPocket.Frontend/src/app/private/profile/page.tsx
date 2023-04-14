import { Descriptions } from '@/components';
import ChangePasswordForm from '@/components/forms/changePasswordForm';
import { getSession } from '@/services/session';

async function Profile() {
  const { user } = await getSession();
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
      </Descriptions>
      <h4>Change Password</h4>
      <ChangePasswordForm email={user.email} />
    </div>
  );
}
export default Profile;
