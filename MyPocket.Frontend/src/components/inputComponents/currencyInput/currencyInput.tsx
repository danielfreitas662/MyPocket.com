'use client';
import clsx from 'clsx';
import React, { InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import styles from './currencyInput.module.scss';
import { currencyFormat, currencyNormalize } from '@/utils/formatters';

interface EventHandler {
  target: any;
  type: string;
}
export interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  value?: number;
  onChange?: (event: EventHandler) => void;
  onBlur?: (event: EventHandler) => void;
  name?: string;
  decimalSeparator?: string;
  thousandsSeparator?: string;
}

const formatNewInput = (pv: string, nv: string, decimalSeparator: string = ',', thousandsSeparator: string = '.') => {
  let format: string = '';
  if (nv.length > pv.length) {
    let parts = nv.split(decimalSeparator);
    let temp = parts[0] + parts[1][0] + decimalSeparator + parts[1].slice(1, parts[1].length);
    format = temp;
  }
  if (nv.length < pv.length) {
    let parts = nv.split(',');
    if (parts[0][0] === '0') parts[0] = parts[0].slice(1, parts[0].length - 1);
    let temp = parts[0].slice(0, parts[0].length - 1) + decimalSeparator + parts[0][parts[0].length - 1] + parts[1];
    format = temp;
  }
  return currencyFormat(currencyNormalize(format), 'pt-BR');
};
const CurrencyInput = React.forwardRef(
  (
    {
      icon,
      error,
      onChange,
      onBlur,
      name,
      id,
      decimalSeparator = ',',
      thousandsSeparator = '.',
      value,
      ...restProps
    }: CurrencyInputProps,
    ref: React.Ref<HTMLInputElement> | undefined
  ) => {
    let nodeValue: any = currencyFormat(0, 'pt-BR');
    const [internalValue, setInternalValue] = useState<string>(
      (value && currencyFormat(value || 0, 'pt-BR')) || nodeValue
    );
    useEffect(() => {
      if (Number(value)) setInternalValue(currencyFormat(value, 'pt-BR'));
    }, [value]);
    useEffect(() => {
      if (value) {
        setInternalValue(currencyFormat(value, 'pt-BR'));
      } else if (nodeValue) {
        if (Number(nodeValue)) setInternalValue(currencyFormat(nodeValue, 'pt-BR'));
        else setInternalValue(nodeValue);
      }
    }, [nodeValue, value]);
    return (
      <div
        className={clsx({
          [styles.textInput]: true,
          [styles.error]: !!error,
        })}
      >
        <div className="icon">{icon}</div>
        <input
          id={id}
          value={internalValue}
          onChange={(event) => {
            const newValue = formatNewInput(internalValue, event.target.value);
            const test: EventHandler = {
              type: 'onchange',
              target: {
                name: name,
                value: currencyNormalize(newValue),
              },
            };
            setInternalValue(newValue);
            onChange && onChange(test);
            onBlur && onBlur(test);
          }}
        />
        <input
          name={name}
          value={internalValue}
          style={{ display: 'none' }}
          onChange={onChange}
          {...restProps}
          ref={(node) => {
            //@ts-ignore
            ref && ref(node);
            if (node) {
              nodeValue = node.value;
            }
          }}
        />
      </div>
    );
  }
);
CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
