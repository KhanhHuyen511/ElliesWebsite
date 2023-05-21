import React, { useEffect } from 'react';
import { Col } from 'react-flexbox-grid';
import styles from './Exercise.module.scss';
import classNames from 'classnames/bind';
import { CategoryPanel, ExCard } from '../../components';
import { AcademicCapIcon, QueueListIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getListExs, getListUserExs } from '../../redux/slice/exSlice';
const cx = classNames.bind(styles);

const Exercise = () => {
  const exs = useSelector((state: RootState) => state.ex.listUserExs);
  const dispatch = useDispatch<AppDispatch>();

  const userID = useSelector((state: RootState) => state.auth.userID) || '';

  useEffect(() => {
    dispatch(getListUserExs(userID));
  }, [dispatch]);

  return (
    <>
      <div className='container'>
        <Col xs={12} md={8} lg={6}>
          <p className={cx('title')}>Luyện tập</p>
          <ul className={cx('')}>{}</ul>
        </Col>

        <ul className={cx('doc-cate-wrapper')}>
          <CategoryPanel
            label={'Vocabs'}
            isActive
            classNames={cx('cate-item')}
            icon={<AcademicCapIcon />}
          />
          <CategoryPanel
            label={'Sentences'}
            classNames={cx('cate-item')}
            icon={<QueueListIcon />}
          />
        </ul>
        <p className={cx('sub-title')}>Đã làm</p>
        <ul className={cx('list')}>
          {exs &&
            exs.length > 0 &&
            exs.map((item, index) => (
              <li key={index} className={cx('item')}>
                <ExCard data={item} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Exercise;
