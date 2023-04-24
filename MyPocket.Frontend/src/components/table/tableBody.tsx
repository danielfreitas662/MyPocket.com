import React from 'react';
import { TableContext } from './tableContext';
import { FaDatabase } from 'react-icons/fa';
import styles from './table.module.scss';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

function TableBody() {
  const { columns, dataSource, rowKey } = React.useContext(TableContext);
  const t = useTranslations('Table');
  return (
    <tbody>
      {dataSource.length === 0 && (
        <tr>
          <td colSpan={columns.length}>
            <div className={styles.empty}>
              <div>
                <FaDatabase />
              </div>
              <div>{t('empty')}</div>
            </div>
          </td>
        </tr>
      )}
      {dataSource.map((row, rowIndex) => (
        <tr key={row[rowKey]}>
          {columns.map((col, colIndex) => (
            <td
              key={colIndex}
              className={clsx({
                [styles.alignLeft]: col.align === 'left',
                [styles.alignRight]: col.align === 'right',
                [styles.alignCenter]: col.align === 'center',
              })}
            >
              {(col.render && col.render(row[col.dataIndex], row, rowIndex)) || row[col.dataIndex]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
