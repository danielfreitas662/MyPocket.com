import { PageTitle } from 'components';
import styles from './page.module.scss';

export const metadata = {
  title: 'MyPocket - Categories',
};
function Category() {
  return (
    <div className={styles.body}>
      <PageTitle>Categories</PageTitle>
    </div>
  );
}
export default Category;
