import loginPic from '@/images/login/login.png';
import Image from 'next/image';
import ForgotPasswordForm from '@/components/forms/forgotPasswordForm';
import { Col, Row } from '@/components';
function Login() {
  return (
    <Row justifyContent="center" alignItems="center" wrap>
      <Col flex="1 1 400px" align="center">
        <Image src={loginPic} width={300} alt="login" />
      </Col>
      <Col flex="0 1 400px">
        <ForgotPasswordForm />
      </Col>
    </Row>
  );
}

export default Login;
