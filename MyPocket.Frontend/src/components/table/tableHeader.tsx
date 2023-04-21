import { useEffect, useRef, useState } from 'react';
import { FilterProps, RecordType, Sorter } from './tableTypes';
import React from 'react';
import clsx from 'clsx';
import Button from '../button/button';
import TextInput from '../inputComponents/textinput/textInput';
import { TableContext } from './tableContext';
import styles from './table.module.scss';
import { FaArrowDown, FaArrowUp, FaFilter } from 'react-icons/fa';
import DatePicker from '../inputComponents/datePicker/datePicker';
import moment from 'moment';

function TableHeader() {
  const { columns, onChange, setCurrentSorter, currentSorter, currentPagination, filter, setFilter } =
    React.useContext(TableContext);
  const [filterBox, setFilterBox] = useState<null | keyof RecordType>(null);

  return (
    <thead>
      <tr>
        {columns.map((c, i) => (
          <>
            <th
              key={i}
              style={{ width: c.width }}
              className={clsx({
                [styles.alignLeft]: c.align === 'left',
                [styles.alignRight]: c.align === 'right',
                [styles.alignCenter]: c.align === 'center',
                [styles.sorter]: (typeof c.sorter === 'boolean' && c.sorter === true) || c.sorter,
              })}
              onClick={() => {
                console.log(c.sorter);
                if ((typeof c.sorter === 'boolean' && c.sorter === true) || c.sorter) {
                  const newSorter: () => Sorter = () => {
                    if (currentSorter.field === c.dataIndex) {
                      if (currentSorter.order === 'asc') return { field: currentSorter.field, order: 'desc' };
                      else if (currentSorter.order === 'desc') return { field: null, order: null };
                      else return { field: c.dataIndex, order: 'asc' };
                    } else {
                      return { field: c.dataIndex, order: 'asc' };
                    }
                  };
                  setCurrentSorter(newSorter());
                  onChange && onChange(filter, newSorter(), currentPagination);
                }
              }}
            >
              <div
                className={clsx({
                  [styles.header]: true,
                })}
              >
                <div className={styles.headerTitle}>{c.title}</div>
                <div className={styles.headerSorter}>
                  {c.filter && (
                    <div
                      className={clsx({ [styles.filter]: true, [styles.active]: filter[c.dataIndex] })}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilterBox(c.dataIndex);
                      }}
                    >
                      <FaFilter />
                    </div>
                  )}
                  <div>
                    {currentSorter.field === c.dataIndex && currentSorter.order === 'asc' && <FaArrowDown />}
                    {currentSorter.field === c.dataIndex && currentSorter.order === 'desc' && <FaArrowUp />}
                  </div>
                </div>
              </div>
              {c.filter && (
                <FilterBox
                  column={filterBox}
                  setFilterValue={setFilter}
                  setColumn={setFilterBox}
                  dataIndex={c.dataIndex}
                  filterType={c.filter.filterType}
                />
              )}
            </th>
          </>
        ))}
      </tr>
    </thead>
  );
}

const FilterBox = ({ filterType, column, dataIndex, setColumn }: FilterProps) => {
  const { onChange, filter, setFilter, currentPagination, currentSorter } = React.useContext(TableContext);
  const filterboxRef = useRef<any>();
  const [internalValue, setInternalValue] = useState(filter[dataIndex]);
  useEffect(() => {
    //Event to close filterbox when click outside it not working
    //For now the user must click on Cancel button in the filterbox to close it
    function handleClickOutside(event: MouseEvent) {
      if (filterboxRef.current && !filterboxRef.current.contains(event.target)) {
        //setColumn(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleConfirm = () => {
    onChange && onChange(filter, currentSorter, currentPagination);
    setColumn(null);
  };
  const handleClear = () => {
    setFilter({ ...filter, [dataIndex]: null });
    setInternalValue(null);
    onChange && onChange({ ...filter, [dataIndex]: null }, currentSorter, currentPagination);
    setColumn(null);
  };
  return (
    <div
      ref={filterboxRef}
      className={clsx({
        [styles.filterBox]: true,
        [styles.filterBoxVisible]: column === dataIndex,
      })}
    >
      <div className={styles.body}>
        {filterType === 'string' && (
          <TextInput
            value={internalValue || ''}
            onChange={(e) => {
              setFilter({ ...filter, [dataIndex]: e.target.value });
              setInternalValue(e.target.value);
            }}
            placeholder="Search..."
          />
        )}
        {filterType === 'date' && (
          <DatePicker
            value={moment(internalValue).isValid() ? moment(internalValue) : null}
            onChange={(e) => {
              setFilter({
                ...filter,
                [dataIndex]: moment(e.target.value).isValid() ? moment(e.target.value).format('YYYY-MM-DD') : null,
              });
              setInternalValue(e.target.value);
            }}
            placeholder="Search..."
          />
        )}
      </div>
      <div className={styles.menu}>
        <Button
          theme="secondary"
          onClick={() => {
            setColumn(null);
            setFilter({ ...filter, [dataIndex]: null });
          }}
        >
          Cancel
        </Button>
        <Button theme="secondary" onClick={() => handleClear()}>
          Clear
        </Button>
        <Button theme="primary" onClick={() => handleConfirm()}>
          Filter
        </Button>
      </div>
    </div>
  );
};
export default TableHeader;
