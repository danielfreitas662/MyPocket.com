'use client';
import clsx from 'clsx';
import React from 'react';
import { InputHTMLAttributes } from 'react';
import { FaCalendar } from 'react-icons/fa';
import styles from './datePicker.module.scss';

export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
const DatePicker = React.forwardRef(
  ({ error, ...restProps }: DatePickerProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div
        className={clsx({
          [styles.datePicker]: true,
          [styles.error]: !!error,
        })}
      >
        <input type="date" ref={ref} {...restProps} />
        <FaCalendar />
      </div>
    );
  }
);

export default DatePicker;
