import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Button, Input } from '../../components';
import { Col } from 'react-flexbox-grid';
import styles from './auth.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const isValid = (e: React.FormEvent) => {
    e.preventDefault();

    // check if password is equal to confirm password
    if (password !== confirmPassword) {
      toast('Confirm Password is not equal to Password!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success('Regiter successfull!');
        // log out
        signOut(auth)
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
        navigate('/login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <Col xs={12} md={6} lg={4} xl={3} className={cx('wrapper', 'container')}>
      <ToastContainer />
      <form onSubmit={(e) => isValid(e)}>
        <p className={cx('page-name')}>Đăng kí</p>
        <div className={cx('input')}>
          <Input
            label='Email'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='huyen.nguyen'
          />
        </div>
        <div className={cx('input')}>
          <Input
            label='Mật khẩu'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder='******'
          />
        </div>
        <div className={cx('input')}>
          <Input
            label='Nhập lại mật khẩu'
            type='password'
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder='******'
          />
        </div>
        {/* <p className={cx('forgot-pass-text')}>Quên mật khẩu</p> */}
        <div className={cx('button-wrapper')}>
          <embed src='images/facebook-icon.svg'></embed>
          <div className={cx('submit-button')}>
            <Button
              type='submit'
              isPrimary={true}
              haveIcon={true}
              onClick={() => {}}
            >
              Đăng kí
            </Button>
          </div>
        </div>
      </form>
    </Col>
  );
};

export default Register;