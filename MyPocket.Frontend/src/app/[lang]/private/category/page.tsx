import CategoriesTable from '@/components/tables/categoriesTable';
import styles from './page.module.scss';
import { PageSearchParams } from '@/types/pagination';
import { ICategory } from '@/types/category';
import { cookies } from 'next/headers';
import { getCategories } from '@/services/api/category';
import { Suspense } from 'react';
import { Skeleton } from '@/components';

interface PageProps {
  searchParams: PageSearchParams & ICategory;
  params: {
    lang: string;
  };
}
async function Category({ searchParams, params }: PageProps) {
  const session = cookies().get('session')?.value;
  const { data } = await getCategories(
    {
      filters: {
        name: searchParams.name,
      } as ICategory,
      pagination: { current: searchParams.current, pageSize: searchParams.pageSize },
      sorter: { field: searchParams.field, order: searchParams.order },
    },
    session,
    params.lang
  );
  return (
    <div className={styles.body}>
      <Suspense fallback={<Skeleton rows={10} />}>
        <CategoriesTable searchParams={searchParams} data={data} />
      </Suspense>
    </div>
  );
}
export default Category;
