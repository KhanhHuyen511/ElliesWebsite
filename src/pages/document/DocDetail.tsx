import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getADoc, getListVocabs } from '../../redux/slice/docSlice';
import { AppDispatch, RootState } from '../../redux/store';
import style from './DocDetail.module.scss';
import classNames from 'classnames/bind';
import { VocabCard } from '../../components';
const cx = classNames.bind(style);

const DocDetail = () => {
  let { id } = useParams();

  const item = useSelector((state: RootState) => state.doc.currentDoc);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) dispatch(getADoc(id));
  }, [dispatch, id]);

  return (
    <div className='container'>
      <div className={cx('section-title')}>Mô tả</div>
      <div className={cx('desc')}>{item?.description}</div>
      <div className={cx('section-title')}>Từ vựng</div>
      <ul className={cx('list-card')}>
        {item?.listItems &&
          item.listItems.length > 0 &&
          item.listItems.map((item) => (
            <li className={cx('list-item')}>
              <VocabCard card={item} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DocDetail;
