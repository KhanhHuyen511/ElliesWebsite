import React from 'react';
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import TextArea from '../textarea/TextArea';
import {
  HandThumbUpIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
const cx = classNames.bind(styles);

const Comment = () => {
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('info')}>
          <div className={cx('author-wrapper')}>
            <div
              className={cx('avatar')}
              // onClick={() => navigate('/profile')}
            >
              <img
                src='/images/avatar.png'
                className={cx('avatar-img')}
                alt=''
              />
            </div>
            <p className={cx('author')}>Daisy Tran</p>
          </div>
          <p className={cx('create-date')}>03/03/2023</p>
        </div>
        <TextArea
          label=''
          value={''}
          onChange={() => {
            // setDescription(e.target.value);
          }}
          placeholder='Nhập bình luận'
          classNames={cx('textarea')}
        />
        <div className={cx('foot-section')}>
          <PaperAirplaneIcon width={24} height={24} />
          <div className={cx('like-wrapper')}>
            <HandThumbUpIcon
              className={cx('like-icon')}
              width={20}
              height={20}
            />
            <p className={cx('like-number')}>5</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
