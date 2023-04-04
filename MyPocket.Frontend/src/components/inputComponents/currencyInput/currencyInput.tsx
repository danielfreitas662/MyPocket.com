'use client';
import clsx from 'clsx';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import styles from './currencyInput.module.scss';
import IntlCurrencyInput from 'react-intl-currency-input';
export interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}
const currencyConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};
const CurrencyInput = React.forwardRef(
  ({ icon, error, ...restProps }: CurrencyInputProps, ref: React.Ref<HTMLInputElement> | undefined) => {
    return (
      <div
        className={clsx({
          [styles.textInput]: true,
          [styles.error]: !!error,
        })}
      >
        <div className="icon">{icon}</div>
        {/* @ts-ignore */}
        <IntlCurrencyInput currency="BRL" inputRef={ref} {...restProps} config={currencyConfig} />
      </div>
    );
  }
);

export default CurrencyInput;
