import React from 'react'
import { Col } from 'react-flexbox-grid';
import styles from './Document.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Document = () => {
  return (
    <>
      <div className='container'>
        <Col xs={12} md={8} lg={6}>
          <p className={cx('page-title')}>Tài liệu</p>
          <ul className={cx('')}>{}</ul>
        </Col>
      </div>
    </>
  );
}

export default Document