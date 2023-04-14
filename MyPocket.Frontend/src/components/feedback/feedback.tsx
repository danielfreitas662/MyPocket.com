'use client';
import clsx from 'clsx';
import styles from './feedback.module.scss';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaInfoCircle, FaPlus, FaStopCircle } from 'react-icons/fa';

interface FeedbackProps {
  type: 'info' | 'error' | 'success';
  message: string;
  dismissable?: boolean;
}
function Feedback({ type, message, dismissable }: FeedbackProps) {
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    setDismissed(false);
    const timeout = setTimeout(() => {
      setDismissed(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message, type]);
  return (
    <div
      className={clsx({
        [styles.feedback]: true,
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
        [styles.info]: type === 'info',
        [styles.visible]: message,
        [styles.dismissed]: dismissed,
      })}
    >
      <div className={styles.icon}>
        {type === 'error' && <FaStopCircle />}
        {type === 'info' && <FaInfoCircle />}
        {type === 'success' && <FaCheckCircle />}
      </div>
      <div className={styles.message}>{message}</div>
      <div className={styles.close} onClick={() => setDismissed(true)}>
        {dismissable && <FaPlus />}
      </div>
    </div>
  );
}

export default Feedback;
