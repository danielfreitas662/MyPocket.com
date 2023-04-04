'use client';
import clsx from 'clsx';
import React, { InputHTMLAttributes, ReactNode, useState } from 'react';
import styles from './textInput.module.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

const TextInput = React.forwardRef(
  ({ icon, error, ...restProps }: TextInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div
        className={clsx({
          [styles.textInput]: true,
          [styles.error]: !!error,
        })}
      >
        <div className="icon">{icon}</div>
        <input ref={ref} {...restProps} />
      </div>
    );
  }
);

export default TextInput;
