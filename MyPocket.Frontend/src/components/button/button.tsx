'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

function Button({ children, icon, onClick, ...restProps }: ButtonProps) {
  let buttonRef: HTMLButtonElement | null = null;
  return (
    <div className={styles.button} onClick={() => buttonRef?.click()}>
      {icon}
      <button ref={(btn) => (buttonRef = btn)} {...restProps}>
        {children}
      </button>
    </div>
  );
}
export default Button;
