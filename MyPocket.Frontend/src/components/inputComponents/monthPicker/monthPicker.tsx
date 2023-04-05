'use client';
import clsx from 'clsx';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { FaBackward, FaCalendar, FaForward } from 'react-icons/fa';
import styles from './monthPicker.module.scss';

interface MonthPickerProps {
  value?: moment.Moment;
  onChange?: (value: moment.Moment) => void;
}
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState<moment.Moment>(value || moment());
  const [year, setYear] = useState<number>(moment().year());
  const ref = useRef<any>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={clsx({ [styles.component]: true, [styles.visible]: visible })} onClick={() => setVisible(true)}>
        {value?.format('MMM-YYYY') || internalValue.format('MMM-YYYY')}
        <FaCalendar />
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
              className={clsx({
                [styles.month]: true,
                [styles.active]:
                  moment(`${m}-${year}`, 'MMM-YYYY').format('MMM-YYYY') === internalValue.format('MMM-YYYY'),
              })}
              onClick={() => {
                const newDate = moment(`${m}-${year}`, 'MMM-YYYY');
                setInternalValue(newDate);
                onChange && onChange(newDate);
                setVisible(false);
              }}
            >
              {m}
            </div>
          ))}
        </div>
        <div className={styles.currentMonth} onClick={() => setYear(internalValue.year())}>
          Current Month
        </div>
      </div>
    </div>
  );
}
export default MonthPicker;
