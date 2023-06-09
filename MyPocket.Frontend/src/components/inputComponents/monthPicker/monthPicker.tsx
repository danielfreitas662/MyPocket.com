'use client';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaCalendar, FaForward } from 'react-icons/fa';
import styles from './monthPicker.module.scss';

interface EventHandler {
  target: {
    value: moment.Moment | null;
    name: string | undefined;
  };
  type: string;
}

interface MonthPickerProps {
  value?: moment.Moment | null;
  name?: string;
  ref?: any;
  id?: string;
  placeholder?: string;
  onChange?: (event: EventHandler) => void;
}
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function MonthPicker({ value, placeholder, onChange, ref, name, id }: MonthPickerProps) {
  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState<moment.Moment | null>((value?.isValid() && value) || null);
  const [year, setYear] = useState<number>(moment().year());
  const wrapperRef = useRef<any>();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={clsx({ [styles.component]: true, [styles.visible]: visible })}
        onClick={() => setVisible(true)}
        ref={ref}
      >
        <input style={{ display: 'none' }} id={id} />
        <div>{value?.format('MMM-YYYY') || internalValue?.format('MMM-YYYY') || placeholder}</div>
        <div>
          <FaCalendar />
        </div>
      </div>
      <div className={clsx({ [styles.calendar]: true, [styles.visible]: visible })}>
        <div className={styles.menu}>
          <div className={styles.yearButton} onClick={() => setYear((pv) => pv - 1)}>
            <FaBackward />
          </div>
          <div className={styles.currentYear}>{year}</div>
          <div className={styles.yearButton} onClick={() => setYear((pv) => pv + 1)}>
            <FaForward />
          </div>
        </div>
        <hr />
        <div className={styles.months}>
          {months.map((m) => (
            <div
              key={m}
              className={clsx({
                [styles.month]: true,
                [styles.active]:
                  moment(`${m}-${year}`, 'MMM-YYYY').format('MMM-YYYY') === internalValue?.format('MMM-YYYY'),
              })}
              onClick={() => {
                const newDate = moment(`${m}-${year}`, 'MMM-YYYY');
                setInternalValue(newDate);
                const test: EventHandler = {
                  type: 'onchange',
                  target: {
                    name: name,
                    value: newDate,
                  },
                };
                onChange && onChange(test);
                setVisible(false);
              }}
            >
              {m}
            </div>
          ))}
        </div>
        <div
          className={styles.currentMonth}
          onClick={() => {
            internalValue && setYear(internalValue?.year());
            setInternalValue(moment());
            setVisible(false);
          }}
        >
          Current Month
        </div>
      </div>
    </div>
  );
}
export default MonthPicker;
