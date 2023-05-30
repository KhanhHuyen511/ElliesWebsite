import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classNames from 'classnames/bind';
import style from './CreateBlog.module.scss';
import { Button, Input } from '../../components';
const cx = classNames.bind(style);

const CreateBlog = () => {
  const [content, setContent] = useState('');
  return (
    <>
      <div className='container'>
        <p className={cx('title')}>Tạo bài viết</p>
        <Input label={'Tiêu đề'} placeholder={''} onChange={() => {}} />
        <Input label={'Từ khoá'} placeholder={''} onChange={() => {}} />
        <ReactQuill
          theme='snow'
          value={''}
          placeholder={'Nhập nội dung'}
          onChange={(content, delta, source, editor) => {}}
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                ['link', 'image'],
                ['clean'],
                [{ color: [] }],
              ],
              handlers: {
                // image: this.imageHandler
              },
            },
            // table: true,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: 'hi',
          }}
        ></div>
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
