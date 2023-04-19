import React from 'react';
import contact from '../../images/contact/contact.png';
import Image from 'next/image';
import { ContactForm } from '@/components/forms';
import { Col, Row } from '@/components';

export const metadata = {
  title: 'MyPocket - Contact',
};
function Contact() {
  return (
    <Row gutter={[10, 10]} justifyContent="center" alignItems="center" wrap>
      <Col flex="1 1 400px" align="center">
        <Image src={contact} alt="contact" width={300} />
      </Col>
      <Col flex="0 1 400px">
        <ContactForm />
      </Col>
    </Row>
  );
}

export default Contact;
