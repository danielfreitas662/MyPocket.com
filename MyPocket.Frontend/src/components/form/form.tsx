'use client';
import { GetPattern } from '@/utils/patterns';
import clsx from 'clsx';
import React, { DetailedHTMLProps, FormHTMLAttributes, ReactNode, useRef } from 'react';
import { useForm, UseFormReturn, ValidateResult, ValidationRule } from 'react-hook-form';
import styles from './form.module.scss';

const FormContext = React.createContext<UseFormReturn<any, any> | null>(null);

interface FormProviderProps {
  children: ReactNode;
  initialValues?: any;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const formInstance = useForm<typeof initialValues>({ defaultValues: initialValues });
  return <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>;
};

export interface FormProps<FormData = any>
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  children: ReactNode;
  initialValues?: any;
  onFinish?: (values: FormData) => void;
}
function Form({ children, initialValues = null, onFinish, ...restProps }: FormProps) {
  const formInstance = React.useContext(FormContext);
  if (formInstance === null) throw new Error('Form is not wrapped by FormProvider');
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="form"
      {...restProps}
      onSubmit={formInstance.handleSubmit((data) => onFinish && onFinish(data))}
    >
      {children}
    </form>
  );
}

export interface FormItemProps {
  children: ReactNode;
  name: string;
  label: string;
  hidden?: boolean;
  required?: boolean;
  value?: any;
  type?: 'email' | 'usphone';
  min?: ValidationRule<string | number>;
  max?: ValidationRule<string | number>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  validate?: (value: any, formValues: any) => ValidateResult | Promise<ValidateResult>;
}
function FormItem({
  children,
  hidden = false,
  label,
  min,
  max,
  minLength,
  maxLength,
  name,
  validate,
  required,
  type,
}: FormItemProps) {
  const form = React.useContext(FormContext);
  if (form == null) throw new Error('FormItem not wrapped by Form provider');
  const {
    register,
    formState: { errors },
  } = form;
  const message = !!errors[name] && errors[name]?.message;
  return (
    <div
      className={clsx({ [styles.formItem]: true, [styles.hidden]: hidden })}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      <label htmlFor={name + 'Field'}>{label}</label>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          ...children.props,
          value: form.getValues(name),
          error: !!errors[name]?.message,
          id: name + 'Field',
          ...register(name, {
            validate: validate,
            min: min,
            max: max,
            minLength: minLength,
            maxLength: maxLength,
            required: required && 'Required field',
            pattern: { value: GetPattern(type), message: 'Incorrect format' },
          }),
        })}
      <div className={styles.errorMessage}>{message as string}</div>
    </div>
  );
}
Form.Item = FormItem;

export const useCustomForm = () => {
  const form = React.useContext(FormContext);
  if (form === null) throw new Error('Hook is not wrapped by its provider');
  return form;
};

export default Form;
