'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';
import cx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  theme?: 'primary' | 'secondary';
}

function Button({ children, icon, theme = 'primary', disabled, ...restProps }: ButtonProps) {
  let buttonRef: HTMLButtonElement | null = null;
  return (
    <div
      className={cx({
        [styles.button]: true,
        [styles.disabled]: disabled,
        [styles[theme]]: true,
      })}
      onClick={() => icon && buttonRef?.click()}
    >
      {icon}
      <button
        disabled={disabled}
        ref={(btn) => (buttonRef = btn)}
        {...restProps}
        style={{ display: !children ? 'none' : 'block' }}
      >
        {children}
      </button>
    </div>
  );
}
export default Button;
