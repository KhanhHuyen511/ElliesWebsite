import React from 'react';
import classNames from 'classnames/bind';
import style from './BlogCard.module.scss';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
const cx = classNames.bind(style);

const BlogCard = () => {
  return (
    <>
      <div
        className={cx('card')}
        // onClick={() => navigate(`/doc_detail/${data.id}`)}
      >
        <p className={cx('card-title')}>title</p>
        <div className={cx('card-body')}>
          <div className={cx('card-content')}>
            <p className={cx('card-desc')}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className={cx('card-date')}>
              03/03/2023
              <span className={cx('card-keyword-wrapper')}>
                Từ khoá: <span className={cx('keyword')}>#egg</span>
              </span>
              {/* {data.createDate?.toLocaleDateString()} */}
            </p>
          </div>
          <div className={cx('like-wrapper')}>
            <HandThumbUpIcon className='like-icon' width={24} height={24} />
            <p className={cx('like-number')}>5</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
