'use client';
import { GetPattern } from '@/utils/patterns';
import React, { DetailedHTMLProps, FormHTMLAttributes, ReactNode, useRef } from 'react';
import {
  FieldValues,
  useForm as originalUserForm,
  UseFormProps,
  UseFormReturn,
  ValidateResult,
  ValidationRule,
} from 'react-hook-form';
import styles from './form.module.scss';

export interface FormInstance<TFieldValues, TContex> extends UseFormReturn<any, TContex> {
  submit: () => void;
}
const FormContext = React.createContext<FormInstance<any, any> | null>(null);

export interface FormProps<FormData = any>
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  children: ReactNode;
  initialValues?: FormData;
  form?: FormInstance<any, FormData>;
  onFinish?: (values: FormData) => void;
}
function Form({ children, initialValues, onFinish, form, ...restProps }: FormProps) {
  const formInstance = form || useForm<typeof initialValues, any>({ defaultValues: initialValues });
  const formRef = useRef<HTMLFormElement>(null);

  const submit = () => {
    formRef.current?.submit();
  };
  formInstance.submit = submit;
  return (
    <FormContext.Provider value={{ ...formInstance }}>
      <form
        ref={formRef}
        className="form"
        {...restProps}
        onSubmit={formInstance.handleSubmit((data) => onFinish && onFinish(data))}
      >
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
  type?: 'email' | 'usphone';
  min?: ValidationRule<string | number>;
  max?: ValidationRule<string | number>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  validate?: (value: any, formValues: any) => ValidateResult | Promise<ValidateResult>;
}
function FormItem({ children, label, min, max, minLength, maxLength, name, validate, required, type }: FormItemProps) {
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

export function useForm<TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: UseFormProps<TFieldValues, TContext>
): FormInstance<TFieldValues, TContext> {
  return { ...originalUserForm(props), submit: () => null };
}

export default Form;
