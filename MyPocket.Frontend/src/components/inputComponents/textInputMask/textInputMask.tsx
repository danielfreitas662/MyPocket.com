'use client';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styles from './textInputMask.module.scss';
import InputMask, { Props } from 'react-input-mask';

export interface TextInputMaskProps extends Props {
  icon?: ReactNode;
  error?: string;
  mask: any;
}

const TextInputMask = React.forwardRef(
  ({ icon, error, mask, ...restProps }: TextInputMaskProps, ref: React.Ref<HTMLInputElement> | undefined) => {
    return (
      <div
        className={clsx({
          [styles.textInput]: true,
          [styles.error]: !!error,
        })}
      >
        <div className="icon">{icon}</div>
        <InputMask mask={mask} {...restProps} inputRef={ref} type="text" />
      </div>
    );
  }
);

export default TextInputMask;
