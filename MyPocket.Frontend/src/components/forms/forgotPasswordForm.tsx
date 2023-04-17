'use client';
import { Button, Col, Feedback, FormItem, Row, TextInput } from '@/components';
import { LoginModel } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ForgotPasswordForm() {
  const router = useRouter();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginModel>();
  const finish = (values: any) => {
    setLoading(true);
    fetch('/api/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResult(data);
        if (data?.success) {
          router.refresh();
          router.push('/');
        }
      })
      .catch((res) => {
        setLoading(false);
        setResult({ message: res });
      });
  };
  return (
    <form onSubmit={handleSubmit(finish)} style={{ maxWidth: 400 }}>
      <FormItem label="E-mail" error={errors?.email?.message as string}>
        <TextInput
          {...register('email', {
            required: 'Required field',
            pattern: { value: GetPattern('email'), message: 'Incorrect e-mail format' },
          })}
        />
      </FormItem>
      <Row justifyContent="center" gutter={[8, 8]} wrap={false}>
        <Col span={12}>
          <Button type="submit" disabled={loading}>
            Request Password Reset
          </Button>
        </Col>
      </Row>

      <Feedback type={!result?.success ? 'error' : 'success'} message={result?.message} />
    </form>
  );
}
export default ForgotPasswordForm;
