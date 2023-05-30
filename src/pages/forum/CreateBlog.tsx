import React from 'react';
import classNames from 'classnames/bind';
import style from './CreateBlog.module.scss';
import { Button, Input } from '../../components';
const cx = classNames.bind(style);

const CreateBlog = () => {
  return (
    <>
      <div className='container'>
        <p className={cx('title')}>Tạo bài viết</p>
        <Input label={'Tiêu đề'} placeholder={''} onChange={() => {}} />
        <Input label={'Từ khoá'} placeholder={''} onChange={() => {}} />
        <div className={cx('cta')}>
          <Button isPrimary={true} onClick={() => {}}>
            Đăng
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
