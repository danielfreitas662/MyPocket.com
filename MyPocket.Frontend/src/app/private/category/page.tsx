import { Skeleton } from '@/components';
import CategoriesTable from '@/components/tables/categoriesTable';
import { getCategories } from '@/services/category';
import { Suspense } from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'MyPocket - Categories',
};
function Category() {
  return (
    <div className={styles.body}>
      <CategoriesTable />
    </div>
  );
}
export default Category;
