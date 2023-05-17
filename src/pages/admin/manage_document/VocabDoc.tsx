import React, { useState } from 'react';
import styles from './IndexDocument.module.scss';
import classNames from 'classnames/bind';
import { Button, Checkbox } from '../../../components';
import { StudyCard } from '../../../types';
import CreateVocab from './CreateVocabForm';
import EditVocab from './EditVocabForm';
const cx = classNames.bind(styles);

const VocabDoc = ({ list }: { list?: StudyCard[] }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StudyCard>();

  const getCheckedItems = (item: StudyCard): boolean => {
    return selectedItem === item;
  };
  return (
    <>
      <div className={cx('handler')}>
        <Button
          isPrimary={false}
          onClick={() => {
            setIsOpenEditForm(true);
          }}
        >
          Xem chi tiết
        </Button>
        <Button
          isPrimary={false}
          onClick={() => {
            setIsOpenForm(true);
          }}
        >
          Tạo mới
        </Button>
        <Button isPrimary={false} isDanger={true} onClick={() => {}}>
          Xóa
        </Button>
        {/* <Checkbox
              isChecked={isSelectedAll}
              label='Tất cả'
              onChecked={() => setSelectAllItems(!isSelectedAll)}
            ></Checkbox> */}
      </div>
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
          {list &&
            list.map((item, i) => (
              <tr key={i}>
                <td>
                  {item.id && (
                    <Checkbox
                      value={item.id}
                      isChecked={getCheckedItems(item)}
                      onChecked={() => {
                        console.log(item);
                        setSelectedItem(item);
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
      <CreateVocab
        onClose={() => setIsOpenForm(false)}
        isDisplay={isOpenForm}
      />
      {selectedItem && (
        <EditVocab
          vocab={selectedItem}
          onClose={() => setIsOpenEditForm(false)}
          isDisplay={isOpenEditForm}
        ></EditVocab>
      )}
    </>
  );
};

export default VocabDoc;
