import { Skeleton } from '@/components';
import CategoriesTable from '@/components/tables/categoriesTable';
import { getCategories } from '@/services/category';
import { Suspense } from 'react';
import styles from './page.module.scss';

export const metadata = {
  title: 'MyPocket - Categories',
};
async function Category() {
  const result = await getCategories();
  if (!result.error)
    return (
      <div className={styles.body}>
        <Suspense fallback={<Skeleton rows={10} />}>
          <CategoriesTable data={result.data} />
        </Suspense>
      </div>
    );
}
export default Category;
