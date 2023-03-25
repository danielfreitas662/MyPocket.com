import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

function Button({ children, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.button} {...restProps}>
      {children}
    </button>
  );
}
export default Button;
