import React, { useEffect, useState } from 'react';
import styles from './IndexDocument.module.scss';
import classNames from 'classnames/bind';
import VocabDoc from './VocabDoc';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getVocabs } from '../../../redux/slice/adminSlice';

const cx = classNames.bind(styles);

const IndexDocument = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listVocabs = useSelector((state: RootState) => state.admin.listVocabs);

  useEffect(() => {
    dispatch(getVocabs());
  }, [dispatch]);

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>Manage Document</h2>

          <VocabDoc list={listVocabs} />
        </div>
      </div>
    </>
  );
};

export default IndexDocument;
