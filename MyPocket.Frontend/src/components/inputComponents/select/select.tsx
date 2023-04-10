'use client';
import clsx from 'clsx';
import React, { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
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
}
const Select = React.forwardRef(
  (
    { icon, error, options, placeholder, name, value, onBlur, onChange, allowClear = false, id }: SelectProps,
    ref: React.ForwardedRef<any>
  ) => {
    let nodeValue: string = '';
    let nodePosition: { x: number | undefined; y: number | undefined } = { x: undefined, y: undefined };
    let nodeOptionsSize: { x: number | undefined; y: number | undefined } = { x: undefined, y: undefined };
    const [filter, setFilter] = useState<string>('');
    const [internalValue, setInternalValue] = useState<any>(value || nodeValue);
    const componentRef = useRef<any>(null);
    const optionsRef = useRef<any>(null);
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState<string>('');
    const [windowSize, setWindowSize] = useState([0, 0]);
    const [optionsSize, setOptionsSize] = useState([0, 0]);
    const [componentPosition, setComponentPosition] = useState([0, 0]);
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
      setLabel(options?.find((c) => c.value == (value || String(internalValue) || nodeValue))?.label || '');
    }, [value, internalValue, nodeValue]);
    useEffect(() => {
      setInternalValue(nodeValue);
      setLabel(options?.find((c) => c.value == nodeValue)?.label || '');
    }, [nodeValue]);
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    });
    useEffect(() => {
      if (nodeOptionsSize.x !== optionsSize[0] || nodeOptionsSize.y !== optionsSize[1]) {
        setOptionsSize([nodeOptionsSize.x || 0, nodeOptionsSize.y || 0]);
      }
      if (nodePosition.x !== componentPosition[0] || nodePosition.y !== componentPosition[1]) {
        setComponentPosition([nodePosition.x || 0, nodePosition.y || 0]);
      }
    }, [nodePosition, nodeOptionsSize]);
    return (
      <div
        className={styles.container}
        ref={(node) => {
          if (node) {
            componentRef.current = node;
            const p = node.getBoundingClientRect();
            nodePosition = { x: p.x, y: p.y };
          }
        }}
      >
        <div
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
            id={id}
            placeholder={visible ? label || placeholder : placeholder}
          />
          <select
            name={name}
            style={{ display: 'none' }}
            value={internalValue}
            onChange={onChange}
            ref={(node) => {
              //@ts-ignore
              ref && ref(node);
              if (node) {
                nodeValue = node.value;
              }
            }}
          >
            {options?.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {allowClear && (
            <FaPlus
              className={styles.clear}
              onClick={() => {
                setFilter('');
                setLabel('');
                setInternalValue(undefined);
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
        <div
          ref={(node) => {
            if (node) {
              const p = node.getBoundingClientRect();
              nodeOptionsSize = { x: p.width, y: p.height };
            }
          }}
          className={clsx({ [styles.customSelect]: true, [styles.visible]: visible })}
          style={{
            top: componentPosition[1] + optionsSize[1] >= windowSize[1] ? 32 : -optionsSize[1],
            right: componentPosition[0] + optionsSize[0] >= windowSize[0] ? 0 : optionsSize[0],
          }}
        >
          {options
            ?.filter((c) => (filter ? c.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : true))
            .map((c) => (
              <div
                key={c.value}
                className={clsx({
                  [styles.selectOption]: true,
                  [styles.selected]: c.value == (value || internalValue || nodeValue),
                })}
                onClick={() => {
                  nodeValue = c.value;
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
