'use client';
import clsx from 'clsx';
import moment, { utc } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FaBackward, FaCalendar, FaForward } from 'react-icons/fa';
import styles from './datePicker.module.scss';

interface EventHandler {
  target: any;
  type: string;
}

interface MonthPickerProps {
  value?: moment.Moment | null;
  name?: string;
  ref?: any;
  id?: string;
  onChange?: (event: EventHandler) => void;
  onBlur?: (event: EventHandler) => void;
  placeholder?: string;
  error?: string;
}
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DatePicker = React.forwardRef(
  ({ value, onChange, placeholder, onBlur, error, name, id }: MonthPickerProps, ref) => {
    let nodeValue: any = moment(null).format();
    const [visible, setVisible] = useState(false);
    const [internalValue, setInternalValue] = useState<moment.Moment | null>(value || null);
    const [year, setYear] = useState<number>(moment().year());
    const [days, setDays] = useState<number[]>([]);
    const [month, setMonth] = useState<number>(moment().month());
    const [firstDay, setFirstDay] = useState<number>(0);
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
    useEffect(() => {
      const lastDate = moment(`${year}-${month}`, 'YYYY-MM').endOf('month').date();
      const firstDay = moment(`${year}-${month}`, 'YYYY-MM').startOf('month').day();
      let monthDays: number[] = [];
      for (let i = 0; i < lastDate; i++) monthDays.push(i + 1);
      setDays(monthDays);
      setFirstDay(firstDay);
    }, [month, year]);
    useEffect(() => {
      setInternalValue(value || null);
    }, [value]);
    useEffect(() => {
      if (value) {
        if (!value?.isValid()) {
          setInternalValue(null);
        } else if (value?.isValid()) {
          setInternalValue(moment(value));
        }
      } else if (nodeValue) {
        setInternalValue(moment(nodeValue));
      }
    }, [nodeValue, value]);
    return (
      <div className={styles.wrapper} ref={wrapperRef} onBlur={onBlur}>
        <div
          className={clsx({ [styles.component]: true, [styles.visible]: visible, [styles.error]: !!error })}
          onClick={() => setVisible(true)}
        >
          <div>
            {internalValue?.isValid() && internalValue?.format('YYYY-MM-DD')}
            {!internalValue?.isValid() && <span className={styles.placeholder}>{placeholder}</span>}
          </div>
          <input
            name={name}
            id={id}
            value={internalValue?.utc().format()}
            style={{ display: 'none' }}
            ref={(node) => {
              //@ts-ignore
              ref && ref(node);
              if (node) {
                nodeValue = node.value;
              }
            }}
          />
          <div>
            <FaCalendar />
          </div>
        </div>
        <div
          className={clsx({ [styles.calendar]: true, [styles.visible]: visible })}
          style={{ top: wrapperRef.current?.getBoundingClientRect().y + 34 }}
        >
          <div className={styles.yearMenu}>
            <div className={styles.yearButton} onClick={() => setYear((pv) => pv - 1)}>
              <FaBackward />
            </div>
            <div className={styles.currentYear}>{year}</div>
            <div className={styles.yearButton} onClick={() => setYear((pv) => pv + 1)}>
              <FaForward />
            </div>
          </div>
          <div className={styles.monthMenu}>
            <div className={styles.yearButton} onClick={() => setMonth((pv) => (pv > 1 ? pv - 1 : pv))}>
              <FaBackward />
            </div>
            <div className={styles.currentYear}>{months[month - 1]}</div>
            <div className={styles.yearButton} onClick={() => setMonth((pv) => (pv < 12 ? pv + 1 : pv))}>
              <FaForward />
            </div>
          </div>
          <hr />
          <div className={clsx({ [styles.daysOfWeek]: true })}>
            {daysOfWeek.map((c, index) => (
              <div
                key={index}
                className={clsx({ [styles.dayOfWeek]: true, [styles.weekend]: index === 0 || index === 6 })}
              >
                {c}
              </div>
            ))}
            {days.map((d, index) => (
              <>
                {index === 0 && firstDay > 0 && <div style={{ gridColumnStart: 0, gridColumnEnd: firstDay + 1 }}></div>}
                <div
                  key={d}
                  className={clsx({
                    [styles.day]: true,
                    [styles.active]:
                      moment(`${year}-${month}-${d}`, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
                      internalValue?.format('YYYY-MM-DD'),
                    [styles.weekend]:
                      moment(`${year}-${month}-${d}`, 'YYYY-MM-DD').day() === 0 ||
                      moment(`${year}-${month}-${d}`, 'YYYY-MM-DD').day() === 6,
                  })}
                  onClick={() => {
                    const newDate = moment(`${year}-${month}-${d}`, 'YYYY-MM-DD');
                    nodeValue = newDate.format();
                    setInternalValue(newDate);
                    const test: EventHandler = {
                      type: 'onchange',
                      target: {
                        name: name,
                        value: newDate,
                      },
                    };
                    onChange && onChange(test);
                    onBlur && onBlur(test);
                    setVisible(false);
                  }}
                >
                  {d}
                </div>
              </>
            ))}
          </div>
          <div className={styles.months}></div>
          <div className={styles.bottomMenu}>
            <div
              className={styles.currentDay}
              onClick={() => {
                setYear(moment().year());
                setMonth(moment().month() + 1);
                setInternalValue(moment());
                setVisible(false);
                const test: EventHandler = {
                  type: 'onchange',
                  target: {
                    name: name,
                    value: moment(),
                  },
                };
                onChange && onChange(test);
                onBlur && onBlur(test);
              }}
            >
              Today
            </div>
            <div
              className={styles.clear}
              onClick={() => {
                setYear(moment().year());
                setMonth(moment().month() + 1);
                setInternalValue(null);
                setVisible(false);
                const test: EventHandler = {
                  type: 'onchange',
                  target: {
                    name: name,
                    value: null,
                  },
                };
                onChange && onChange(test);
                onBlur && onBlur(test);
              }}
            >
              Clear
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default DatePicker;
