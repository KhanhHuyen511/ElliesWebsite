import React, { useState } from 'react';
import styles from './IndexDocument.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components';
import VocabDoc from './VocabDoc';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { list } from 'firebase/storage';
import CreateVocab from './CreateVocabForm';
const cx = classNames.bind(styles);

const IndexDocument = () => {
  const listVocabs = useSelector((state: RootState) => state.admin.listVocabs);
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>Manage Document</h2>

          <div className={cx('handler')}>
            <Button
              isPrimary={false}
              onClick={() => {
                // navigate('/path_detail/' + selectedItems);
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

          {listVocabs && listVocabs.length > 0 && (
            <VocabDoc list={listVocabs} />
          )}
        </div>
      </div>
      <CreateVocab
        onClose={() => setIsOpenForm(false)}
        isDisplay={isOpenForm}
      />
    </>
  );
};

export default IndexDocument;
