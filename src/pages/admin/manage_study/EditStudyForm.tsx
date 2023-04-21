import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditStudyForm.module.scss';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setStudyPath } from '../../../redux/slice/adminSlice';
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  onClose: () => void;
}

const EditStudyForm = (props: Props) => {
  return (
    <>
      <form className={cx('form', props.classNames)}>
        <p className={cx('form-title')}>Chỉnh sửa Lộ trình học</p>
        <div className={cx('form-body')}>
          <div className={cx('input')}>
            <Input
              label='Name'
              type='text'
              onChange={(e) => {
                // setName(e.target.value);
              }}
              placeholder='abc'
            />
          </div>
          <div className={cx('input')}>
            <Input
              label='Topic'
              type='text'
              onChange={(e) => {
                // setTopic(e.target.value);
              }}
              placeholder='abc'
            />
          </div>
          <div className={cx('input')}>
            <Input
              label='Level'
              type='text'
              onChange={(e) => {
                // setLevel(e.target.value);
              }}
              placeholder='abc'
            />
          </div>
        </div>
        <Button isPrimary onClick={() => {}}>
          Tạo mới
        </Button>
        <Button type='button' isPrimary={false} onClick={props.onClose}>
          Đóng
        </Button>
      </form>
    </>
  );
};

export default EditStudyForm;
