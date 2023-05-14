import React from 'react';
import styles from './IndexDocument.module.scss';
import classNames from 'classnames/bind';
import { Button, Checkbox } from '../../../components';
import { StudyCard } from '../../../types';
const cx = classNames.bind(styles);

const VocabDoc = ({ list }: { list: StudyCard[] }) => {
  return (
    <>
      <table className={cx('table')}>
        <thead>
          <tr>
            <th></th>
            <th>Từ vựng</th>
            <th>Nghĩa</th>
            <th>Audio</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <td>
                {item.id && (
                  <Checkbox
                    value={item.id}
                    // isChecked={getCheckedItems(item.id)}
                    onChecked={() => {
                      // setSelectPath(item.id);
                    }}
                  ></Checkbox>
                )}
              </td>
              <td>{item.display}</td>
              <td>{item.meaning}</td>
              <td>{item.audio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default VocabDoc;
