'use client';
import { Button, Form, TextInput, useForm } from 'components';
import { useUser } from 'context/userContext';
import { LoginModel } from 'types/user';
import styles from './forms.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
function LoginForm() {
  const form = useForm<FormData>({});
  const { login, error } = useUser();
  return (
    <Form form={form} onFinish={(values) => !form.formState.isSubmitting && login(values as LoginModel)}>
      <Form.Item name="email" label="E-mail" required type="email">
        <TextInput />
      </Form.Item>
      <Form.Item name="password" label="Password" required>
        <TextInput type="password" />
      </Form.Item>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Login
      </Button>
      {error && <div className={styles.error}>{error}</div>}
    </Form>
  );
}
export default LoginForm;
