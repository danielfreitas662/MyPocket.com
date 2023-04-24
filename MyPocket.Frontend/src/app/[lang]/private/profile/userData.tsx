import { Descriptions } from '@/components';
import { IUser } from '@/types/user';
import { useTranslations } from 'next-intl';

function UserData({ user }: { user: IUser }) {
  const t = useTranslations('Profile');
  return (
    <Descriptions>
      <Descriptions.Item label="E-mail">{user?.email}</Descriptions.Item>
      <Descriptions.Item label={t('firstName')}>{user?.firstName}</Descriptions.Item>
      <Descriptions.Item label={t('lastName')}>{user?.lastName}</Descriptions.Item>
    </Descriptions>
  );
}

export default UserData;
