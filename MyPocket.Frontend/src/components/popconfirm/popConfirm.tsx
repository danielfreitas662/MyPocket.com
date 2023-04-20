'use client';
import clsx from 'clsx';
import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import Button from '../button/button';
import styles from './popConfirm.module.scss';

interface PopConfirmProps {
  children: ReactNode;
  onConfirm: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  title?: string;
}
function PopConfirm({ children, onConfirm, title }: PopConfirmProps) {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const componentRef = useRef<any>();
  const handleChildrenClick = () => {
    setVisible(true);
  };
  const handleConfirm = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setVisible(false);
    onConfirm && onConfirm(event);
  };
  const handleCancelClick = () => {
    setVisible(false);
  };
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      !visible && setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousedown', handleMouseMove);
    return () => {
      window.removeEventListener('mousedown', handleMouseMove);
    };
  }, [visible]);
  return (
    <div className={styles.popConfirmWrapper} ref={componentRef}>
      <div
        className={clsx({ [styles.popConfirm]: true, [styles.visible]: visible })}
        style={{ top: mousePos.y, left: mousePos.x }}
      >
        <div className={styles.title}>{title}</div>
        <hr />
        <div className={styles.menu}>
          <Button theme="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button onClick={(e) => handleConfirm(e)}>Ok</Button>
        </div>
      </div>
      <div onClick={handleChildrenClick}>{children}</div>
    </div>
  );
}

export default PopConfirm;
