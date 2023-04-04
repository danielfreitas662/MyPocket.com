'use client';
import clsx from 'clsx';
import React, { ReactNode, TextareaHTMLAttributes } from 'react';
import './textAreaInput.styles.scss';

export interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ReactNode;
  error?: string;
}

const TextAreaInput = React.forwardRef(
  ({ icon, error, ...restProps }: TextInputProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
    return (
      <div
        className={clsx({
          'text-area-input': true,
          error: !!error,
        })}
      >
        <div className="icon">{icon}</div>
        <textarea ref={ref} {...restProps} />
      </div>
    );
  }
);

export default TextAreaInput;
