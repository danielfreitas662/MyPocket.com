import signup from '@/images/signup/signup.png';
import Image from 'next/image';
import { SignupForm } from '@/components/forms';
import { Col, Row } from '@/components';
import { useTranslations } from 'next-intl';
function Signup() {
  const t = useTranslations('Signup');
  return (
    <Row justifyContent="space-between" alignItems="center" wrap gutter={[10, 10]}>
      <Col flex="1 1 400px" align="center">
        <Image src={signup} width={200} alt="signup" />
      </Col>
      <Col flex="0 1 400px">
        <SignupForm />
      </Col>
    </Row>
  );
}

export default Signup;
