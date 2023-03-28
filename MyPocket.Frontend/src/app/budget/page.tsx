import { PageTitle } from 'components';
import styles from './page.module.scss';

export const metadata = {
  title: 'MyPocket - Budgets',
};
function Budget() {
  return (
    <div className={styles.body}>
      <PageTitle>Budgets</PageTitle>
    </div>
  );
}
export default Budget;
