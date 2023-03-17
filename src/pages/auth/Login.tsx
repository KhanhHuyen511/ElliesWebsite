import classNames from 'classnames/bind';
import React from 'react';
import { Button, Input } from '../../components';
import { Row, Col } from 'react-flexbox-grid';
import styles from './auth.module.scss';
const cx = classNames.bind(styles);

const Login = () => {
  return (
    <Col xs={12} md={6} lg={4} xl={3} className={cx('wrapper', 'container')}>
      <p className={cx('logo')}>Ellies</p>
      <p className={cx('page-name')}>Đăng nhập</p>
      <div className={cx('input')}>
        <Input label='Email' type='email' placeholder='huyen.nguyen' />
      </div>
      <div className={cx('input')}>
        <Input label='Mật khẩu' type='password' placeholder='******' />
      </div>
      <p className={cx('forgot-pass-text')}>Quên mật khẩu</p>
      <div className={cx('button-wrapper')}>
        <embed src='images/facebook-icon.svg'></embed>
        <div className={cx('submit-button')}>
          <Button isPrimary={true} haveIcon={true} onClick={() => {}}>
            OK baby
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default Login;
