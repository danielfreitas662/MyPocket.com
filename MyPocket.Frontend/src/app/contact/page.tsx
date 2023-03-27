'use client';
import React from 'react';
import styles from './page.module.scss';
import contact from '../../images/contact/contact.png';
import Image from 'next/image';
import { Button, Form, PageTitle, TextAreaInput, TextInput } from 'components';
import { FaEnvelope } from 'react-icons/fa';
import { useForm } from 'components/form/form';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
function Contact() {
  const form = useForm<FormData>({});
  return (
    <div className={styles.body}>
      <PageTitle>Get in touch with us</PageTitle>
      <div className={styles.text}>
        <div className={styles.image}>
          <Image src={contact} alt="contact" height={300} />
        </div>
        <div className={styles.form}>
          <Form form={form} initialValues={{ firstName: 'Daniel' }} onFinish={(values) => console.log(values)}>
            <Form.Item name="firstName" label="First Name" required>
              <TextInput />
            </Form.Item>
            <Form.Item name="lasName" label="Last Name" required>
              <TextInput />
            </Form.Item>
            <Form.Item name="email" label="E-mail" required>
              <TextInput />
            </Form.Item>
            <Form.Item name="message" label="Message" required>
              <TextAreaInput rows={8} />
            </Form.Item>
            <Button icon={<FaEnvelope />} type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
