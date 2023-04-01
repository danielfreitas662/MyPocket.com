import { Descriptions } from '@/components';
import { getSession } from '@/services/session';
import styles from './page.module.scss';

async function Profile() {
  const { user } = await getSession();
  return (
    <div className={styles.body}>
      <Descriptions>
        <Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
export default Profile;
