import React, { InputHTMLAttributes, ReactNode } from 'react';
import './textInput.styles.scss';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

const TextInput = React.forwardRef(
  ({ icon, error, ...restProps }: TextInputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div className={'text-input' + (!!error ? ' error' : '')}>
        <div className="icon">{icon}</div>
        <input ref={ref} {...restProps} />
      </div>
    );
  }
);

export default TextInput;
