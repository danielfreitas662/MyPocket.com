import { Descriptions } from '@/components';
import { getSession } from '@/services/session';

async function Profile() {
  const { user } = await getSession();
  return (
    <Descriptions>
      <Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
      <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
      <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
    </Descriptions>
  );
}
export default Profile;
