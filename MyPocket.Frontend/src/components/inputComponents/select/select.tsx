'use client';
import clsx from 'clsx';
import React, { InputHTMLAttributes, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { useController, UseFormRegisterReturn } from 'react-hook-form';
import { FaDatabase, FaPlus } from 'react-icons/fa';
import styles from './select.module.scss';

export interface SelectOption {
  value: any;
  label: string;
}

export interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onClick' | 'name' | 'onChange' | 'onBlur'>,
    Partial<Omit<UseFormRegisterReturn, 'ref'>> {
  icon?: ReactNode;
  error?: string;
  options?: SelectOption[];
  allowClear?: boolean;
  control?: any;
}
const Select = React.forwardRef(
  (
    { icon, error, options, placeholder, control, allowClear = false, ...restProps }: SelectProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const { field } = useController({ name: restProps.name || '', control: control });
    const [filter, setFilter] = useState<string>('');
    const componentRef = useRef<any>();
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState<string>(options?.find((c) => c.value === field.value)?.label || '');
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
          setVisible(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
      if (field.value) {
        setLabel(options?.find((c) => c.value === field.value)?.label || '');
      }
    }, [field.value]);

    return (
      <div className={styles.container}>
        <div
          ref={componentRef}
          className={clsx({
            [styles.select]: true,
            [styles.error]: !!error,
          })}
          onFocus={() => setVisible(true)}
        >
          <div className={styles.icon}>{icon}</div>
          <input
            value={visible ? filter : label}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={placeholder}
          />
          <input style={{ display: 'none' }} {...restProps} ref={ref} onChange={(e) => console.log(e.target.value)} />
          {allowClear && (
            <FaPlus
              className={styles.clear}
              onClick={() => {
                setFilter('');
                setLabel('');
                field.onChange(null);
              }}
            />
          )}
        </div>
        <div className={clsx({ [styles.customSelect]: true, [styles.visible]: visible })} ref={componentRef}>
          {options
            ?.filter((c) => (filter ? c.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : true))
            .map((c) => (
              <div
                key={c.value}
                className={clsx({ [styles.selectOption]: true, [styles.selected]: false })}
                onClick={() => {
                  field.onChange(c.value);
                  setVisible(false);
                  setFilter('');
                  setLabel(c.label);
                }}
              >
                {c.label}
              </div>
            ))}
          {options?.filter((c) => (filter ? c.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : true))
            .length === 0 && (
            <div className={styles.empty}>
              <FaDatabase />
              No data
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Select;
