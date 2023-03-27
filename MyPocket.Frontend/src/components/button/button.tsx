'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';
import cx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

function Button({ children, icon, onClick, disabled, ...restProps }: ButtonProps) {
  let buttonRef: HTMLButtonElement | null = null;
  return (
    <div
      className={cx({
        [styles.button]: true,
        [styles.disabled]: disabled,
      })}
      onClick={() => buttonRef?.click()}
    >
      {icon}
      <button disabled={disabled} ref={(btn) => (buttonRef = btn)} {...restProps}>
        {children}
      </button>
    </div>
  );
}
export default Button;
