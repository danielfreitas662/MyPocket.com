'use client';
import { Button, Col, Feedback, FormItem, Row, TextInput } from '@/components';
import { LoginModel } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/userContext';
import { useRouter } from 'next/navigation';

function LoginForm({ returnUrl }: { returnUrl?: string }) {
  const { login, loading, result } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginModel>();
  return (
    <form onSubmit={handleSubmit((data) => login(data, returnUrl))}>
      <FormItem label="E-mail" error={errors?.email?.message as string}>
        <TextInput
          {...register('email', {
            required: 'Required field',
            pattern: { value: GetPattern('email'), message: 'Incorrect e-mail format' },
          })}
        />
      </FormItem>
      <FormItem label="Password" error={errors?.password?.message as string}>
        <TextInput
          type="password"
          error={errors?.password?.message as string}
          {...register('password', {
            required: 'Required field',
          })}
        />
      </FormItem>
      <Row justifyContent="center" gutter={[8, 8]} wrap={false}>
        <Col span={12}>
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </Col>
        <Col span={12}>
          <Link href="/signup">Register</Link>
        </Col>
        <Col span={12}>
          <Link href="/forgot">Forgot Password</Link>
        </Col>
      </Row>
      <Feedback type={!result?.success ? 'error' : 'success'} message={result?.message as string} />
    </form>
  );
}
export default LoginForm;
