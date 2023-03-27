import React, { ReactNode, TextareaHTMLAttributes } from 'react';
import './textAreaInput.styles.scss';

export interface TextInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ReactNode;
  error?: string;
}

const TextAreaInput = React.forwardRef(
  ({ icon, error, ...restProps }: TextInputProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
    return (
      <div className={'text-area-input' + (!!error ? ' error' : '')}>
        <div className="icon">{icon}</div>
        <textarea ref={ref} {...restProps} />
      </div>
    );
  }
);

export default TextAreaInput;
