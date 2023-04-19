import loginPic from '@/images/login/login.png';
import Image from 'next/image';
import { LoginForm } from '@/components/forms';
import { Col, Row } from '@/components';
interface LoginProps {
  searchParams: { returnUrl: string };
}
function Login({ searchParams }: LoginProps) {
  return (
    <Row justifyContent="center" alignItems="center" wrap>
      <Col flex="1 1 400px" align="center">
        <Image src={loginPic} width={300} alt="login" />
      </Col>
      <Col flex="0 1 400px">
        <LoginForm returnUrl={searchParams?.returnUrl} />
      </Col>
    </Row>
  );
}

export default Login;
