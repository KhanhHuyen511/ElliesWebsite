import React from 'react';
import { Col } from 'react-flexbox-grid';
import styles from './Exercise.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Exercise = () => {
  return (
    <>
      <div className='container'>
        <Col xs={12} md={8} lg={6}>
          <p className={cx('page-title')}>Luyện tập</p>
          <ul className={cx('')}>{}</ul>
        </Col>
      </div>
    </>
  );
};

export default Exercise;
