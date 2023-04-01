'use client';
import clsx from 'clsx';
import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ChangeHandler, UseFormRegisterReturn } from 'react-hook-form';
import { FaDatabase, FaPlus } from 'react-icons/fa';
import styles from './select.module.scss';

export interface SelectOption {
  value: any;
  label: string;
}
interface OnChangeEvent {
  target: {
    value: any;
    name?: string;
  };
  type: string;
}
export interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onClick' | 'name' | 'onChange' | 'onBlur'>,
    Partial<Omit<UseFormRegisterReturn, 'onChange'>> {
  icon?: ReactNode;
  error?: string;
  options?: SelectOption[];
  allowClear?: boolean;
  onChange?: any;
}
const Select = React.forwardRef(
  (
    { icon, error, options, placeholder, onChange, id, allowClear = false, ...restProps }: SelectProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [filter, setFilter] = useState<string>('');
    const componentRef = useRef<any>();
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState<string>('');
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
      if (restProps.value) {
        setLabel(options?.find((c) => c.value === restProps.value)?.label || '');
      }
    }, [restProps.value]);
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
          <input
            style={{ display: 'none' }}
            {...restProps}
            ref={ref}
            onChange={(e) => {
              onChange &&
                onChange({
                  type: 'change',
                  target: {
                    value: e.target.value,
                    name: restProps.name || '',
                  },
                });
            }}
            id={id}
          />
          {allowClear && (
            <FaPlus
              className={styles.clear}
              onClick={() => {
                setFilter('');
                setLabel('');
                onChange &&
                  onChange({
                    type: 'change',
                    target: {
                      value: '',
                      name: restProps.name,
                    },
                  });
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
                  onChange &&
                    onChange({
                      type: 'change',
                      target: {
                        value: c.value,
                        name: restProps.name || '',
                      },
                    });
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
