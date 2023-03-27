import React, { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';
import { useForm, UseFormReturn, ValidationRule } from 'react-hook-form';
import styles from './form.module.scss';

const FormContext = React.createContext<UseFormReturn | null>(null);

export interface FormProps<FormData = any>
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: ReactNode;
  initialValues?: FormData;
  form?: UseFormReturn<any, FormData>;
}
function Form({ children, initialValues, form, ...restProps }: FormProps) {
  const formInstance = form || useForm<typeof initialValues>({ defaultValues: initialValues });
  return (
    <FormContext.Provider value={{ ...formInstance }}>
      <form className="form" {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export interface FormItemProps {
  children: ReactNode;
  name: string;
  label: string;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
}
function FormItem({ children, label, name, required, pattern }: FormItemProps) {
  const form = React.useContext(FormContext);
  if (form == null) throw new Error('FormItem not wrapped by Form provider');
  const {
    register,
    formState: { errors },
  } = form;
  const message = !!errors[name] && errors[name]?.message;
  return (
    <div className={styles.formItem}>
      <label htmlFor={name + 'Field'}>{label}</label>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          ...children.props,
          error: !!errors[name]?.message,
          id: name + 'Field',
          ...register(name, { required: required && 'Required field', pattern: pattern }),
        })}
      <div className={styles.errorMessage}>{message as string}</div>
    </div>
  );
}
Form.Item = FormItem;

export default Form;
