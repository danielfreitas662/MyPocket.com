import CategoriesTable from '@/components/tables/categoriesTable';
import styles from './page.module.scss';
import { PageSearchParams } from '@/types/pagination';
import { ICategory } from '@/types/category';

export const metadata = {
  title: 'MyPocket - Categories',
};
interface PageProps {
  searchParams: PageSearchParams & ICategory;
}
function Category({ searchParams }: PageProps) {
  return (
    <div className={styles.body}>
      <CategoriesTable {...searchParams} />
    </div>
  );
}
export default Category;
