import { PageTitle } from 'components';
import styles from './page.module.scss';

export const metadata = {
  title: 'MyPocket - Accounts',
};
function Account() {
  return (
    <div className={styles.body}>
      <PageTitle>Accounts</PageTitle>
    </div>
  );
}
export default Account;
