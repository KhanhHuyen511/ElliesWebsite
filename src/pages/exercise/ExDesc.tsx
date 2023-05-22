import React from 'react';
import style from './ExDesc.module.scss';
import classNames from 'classnames/bind';
import { Ex } from '../../types';
const cx = classNames.bind(style);

const ExDesc = ({ data }: { data: Ex }) => {
  return (
    <>
      <div className={cx('section-title')}>Mô tả</div>
      <div className={cx('desc')}>{data.description}</div>
    </>
  );
};

export default ExDesc;
