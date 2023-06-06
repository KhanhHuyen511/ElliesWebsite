import React, { useState } from 'react';
import styles from './IndexDocument.module.scss';
import classNames from 'classnames/bind';
import { Button, Checkbox } from '../../../components';
import { StudyCard, StudyCardType } from '../../../types';
import CreateVocab from './CreateVocabForm';
import EditVocab from './EditVocabForm';
const cx = classNames.bind(styles);

const VocabDoc = ({
  list,
  type,
}: {
  list?: StudyCard[];
  type: StudyCardType;
}) => {
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
            <th>Tiếng Anh</th>
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
        type={type}
        onClose={() => setIsOpenForm(false)}
        isDisplay={isOpenForm}
      />
      {isOpenEditForm && selectedItem && (
        <EditVocab
          vocab={selectedItem}
          onClose={() => setIsOpenEditForm(false)}
          isDisplay={isOpenEditForm}
          type={type}
        ></EditVocab>
      )}
    </>
  );
};

export default VocabDoc;
