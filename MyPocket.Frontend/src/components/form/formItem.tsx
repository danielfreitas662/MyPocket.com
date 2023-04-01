import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styles from './form.module.scss';
import { v4 } from 'uuid';

interface FormItemProps {
  label: string;
  hidden?: boolean;
  children: ReactNode;
  error?: string;
}
function FormItem({ hidden, label, children, error }: FormItemProps) {
  const id = v4();
  return (
    <div
      className={clsx({ [styles.formItem]: true, [styles.hidden]: hidden })}
      style={{ display: hidden ? 'none' : 'flex' }}
    >
      <label htmlFor={id}>{label}</label>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          ...children.props,
          error: !!error,
          id: id,
        })}
      <div className={styles.errorMessage}>{error as string}</div>
    </div>
  );
}
export default FormItem;
