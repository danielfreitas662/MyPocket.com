import { Form } from '@/components';
import CategoryForm from '@/components/forms/categoryForm';
import { getCategoryById } from '@/services/category';

async function Category({ params }: { params: { id: string } }) {
  const result = await getCategoryById(params?.id);
  return (
    <Form initialValues={result.data}>
      <CategoryForm />
    </Form>
  );
}

export default Category;
