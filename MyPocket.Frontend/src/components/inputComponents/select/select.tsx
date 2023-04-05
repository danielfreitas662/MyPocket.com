'use client';
import clsx from 'clsx';
import React, { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { RefCallBack } from 'react-hook-form';
import { FaDatabase, FaPlus } from 'react-icons/fa';
import styles from './select.module.scss';

export interface SelectOption {
  value: any;
  label: string;
}
interface EventHandler {
  target: {
    name: string | undefined;
    value: any;
  };
  type: string;
}
export interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  options?: SelectOption[];
  allowClear?: boolean;
  value?: any;
  onChange?: (event: EventHandler) => void;
  onBlur?: (event: EventHandler) => void;
  ref: (instance: RefCallBack) => void;
}
const Select = React.forwardRef(
  ({ icon, error, options, placeholder, name, value, onBlur, onChange, allowClear = false, id }: SelectProps, ref) => {
    const [filter, setFilter] = useState<string>('');
    const [internalValue, setInternalValue] = useState<any>(value || null);
    const componentRef = useRef<any>(null);
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState<string>(options?.find((c) => c.value === internalValue || value)?.label || '');
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
          setVisible(false);
          setFilter('');
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
      setLabel(options?.find((c) => c.value === value || internalValue)?.label || '');
      setInternalValue(value);
    }, [value]);
    return (
      <div className={styles.container}>
        <div
          ref={componentRef}
          className={clsx({
            [styles.select]: true,
            [styles.error]: !!error,
          })}
          onBlur={() => onBlur && onBlur({ target: { value: internalValue, name: name }, type: 'onblur' })}
          onFocus={() => setVisible(true)}
        >
          <div className={styles.icon}>{icon}</div>
          <input
            value={visible ? filter : label}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            onBlur={onBlur}
            id={id}
            name={name}
            placeholder={visible ? label || placeholder : placeholder}
          />
          {allowClear && (
            <FaPlus
              className={styles.clear}
              onClick={() => {
                setFilter('');
                setLabel('');
                setInternalValue(null);
                onChange &&
                  onChange({
                    type: 'onchange',
                    target: {
                      value: null,
                      name: name,
                    },
                  });
                onBlur &&
                  onBlur({
                    type: 'onchange',
                    target: {
                      value: null,
                      name: name,
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
                className={clsx({ [styles.selectOption]: true, [styles.selected]: c.value === internalValue })}
                onClick={() => {
                  onChange &&
                    onChange({
                      type: 'onchange',
                      target: {
                        value: c.value,
                        name: name,
                      },
                    });
                  onBlur &&
                    onBlur({
                      type: 'onchange',
                      target: {
                        value: c.value,
                        name: name,
                      },
                    });
                  setInternalValue(c.value);
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
