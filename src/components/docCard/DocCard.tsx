import React from 'react';
import styles from './DocCard.module.scss';
import classNames from 'classnames/bind';
import { BookOpenIcon } from '@heroicons/react/24/outline';
const cx = classNames.bind(styles);

const DocCard = () => {
  return (
    <>
      <div className={cx('card')}>
        <p className={cx('card-title')}>Title</p>
        <div className={cx('card-body')}>
          <div className={cx('card-content')}>
            <p className={cx('card-desc')}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className={cx('card-date')}>03/03/2023</p>
          </div>
          <BookOpenIcon className='icon' width={52} height={52} />
        </div>
      </div>
    </>
  );
};

export default DocCard;
