import React from 'react';
import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import Input from '../input/Input';
import Button from '../button/Button';
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  title: string;
  children?: any;
  onClose: () => void;
  onSubmit: () => void;
  isDisplay?: boolean;
}

const Popup = (props: Props) => {
  return (
    <>
      <form className={cx('form', { open: props.isDisplay }, props.classNames)}>
        <p className={cx('form-title')}>{props.title}</p>
        <div className={cx('form-body')}>
          {props.children}
          <div className={cx('form-cta')}>
            <Button
              type='submit'
              isPrimary
              preventDefault
              onClick={() => {
                props.onSubmit();
                props.onClose();
              }}
            >
              Xác nhận
            </Button>
            <Button isPrimary={false} onClick={props.onClose} preventDefault>
              Đóng
            </Button>
          </div>
        </div>
      </form>

      <div className={cx('modal', { display: props.isDisplay })}></div>
    </>
  );
};

export default Popup;
