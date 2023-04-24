'use client';
import { Button, Col, Feedback, FormItem, Row, TextInput } from '@/components';
import { LoginModel } from '@/types/user';
import { GetPattern } from '@/utils/patterns';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/userContext';
import { useTranslations } from 'next-intl';

function LoginForm({ returnUrl }: { returnUrl?: string }) {
  const { login, loading, result } = useUser();
  const t = useTranslations('Login');
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
            required: t('requiredField'),
            pattern: { value: GetPattern('email'), message: t('incorrectFormat') },
          })}
        />
      </FormItem>
      <FormItem label={t('password')} error={errors?.password?.message as string}>
        <TextInput
          type="password"
          error={errors?.password?.message as string}
          {...register('password', {
            required: t('requiredField'),
          })}
        />
      </FormItem>
      <Row justifyContent="center" gutter={[8, 8]} wrap={false}>
        <Col span={12}>
          <Button type="submit" disabled={loading}>
            {t('buttons.login')}
          </Button>
        </Col>
        <Col span={12} align="center">
          <Link href="/signup" style={{ fontSize: 14 }}>
            {t('buttons.register')}
          </Link>
        </Col>
        <Col span={12} align="right">
          <Link href="/forgot" style={{ fontSize: 14 }}>
            {t('buttons.forgot')}
          </Link>
        </Col>
      </Row>
      <Feedback type={!result?.success ? 'error' : 'success'} message={result?.message as string} dismissable />
    </form>
  );
}
export default LoginForm;
