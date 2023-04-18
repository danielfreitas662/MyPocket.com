import signup from '@/images/signup/signup.png';
import Image from 'next/image';
import { SignupForm } from '@/components/forms';
import { Col, Row } from '@/components';
function Signup() {
  return (
    <>
      <Row justifyContent="center" wrap>
        <Col span={12} align="center">
          <Image src={signup} alt="signup" style={{ minWidth: 200 }} />
        </Col>
        <Col span={12}>
          <SignupForm />
        </Col>
      </Row>
    </>
  );
}

export default Signup;
