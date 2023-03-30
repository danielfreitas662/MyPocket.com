'use client';
import { Button, Form, TextAreaInput, TextInput, useForm } from '@/components';
import { FaEnvelope } from 'react-icons/fa';
import styles from './forms.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
function ContactForm() {
  const form = useForm<FormData>({});

  const error = null;
  return (
    <Form form={form} onFinish={(values) => console.log(values)}>
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
      {error && <div className={styles.error}>{error}</div>}
    </Form>
  );
}
export default ContactForm;
