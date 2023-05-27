import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { FireIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Button, Input, TextArea } from '../../components';
import { Student } from '../../types';
import { getCurrentStudent } from '../../redux/slice/studentSlice';
const cx = classNames.bind(style);

const Profile = () => {
  const userID = useSelector((state: RootState) => state.auth.userID) || '';

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.student.currentUser);

  useEffect(() => {
    dispatch(getCurrentStudent(userID));
  });

  return (
    <div className='container'>
      <p className={cx('user-name')}>{user?.name}</p>
      <div className={cx('section-1')}>
        <div className={cx('avatar-wrapper')}>
          <div className={cx('avatar')}>
            <img src='/images/avatar.png' className={cx('avatar-img')} alt='' />
          </div>
        </div>

        <div className={cx('stats')}>
          <div className={cx('stat-item')}>
            <FireIcon className={cx('stat-item-icon')} />
            <p className={cx('stat-item-label')}>20/300</p>
          </div>
          <div className={cx('stat-item')}>
            <FireIcon className={cx('stat-item-icon')} />
            <p className={cx('stat-item-label')}>20/300</p>
          </div>
          <div className={cx('stat-item')}>
            <FireIcon className={cx('stat-item-icon')} />
            <p className={cx('stat-item-label')}>20/300</p>
          </div>
          <div className={cx('stat-item')}>
            <FireIcon className={cx('stat-item-icon')} />
            <p className={cx('stat-item-label')}>20/300</p>
          </div>
        </div>
      </div>

      <div className={cx('check-in')}>???</div>
      <div className={cx('info-section', 'section')}>
        <div className={cx('info-title-wrapper')}>
          <p className={cx('section-title')}>Thông tin cá nhân</p>
          <PencilIcon className={cx('edit-icon')} />
        </div>

        <div className={cx('info-body')}>
          <Input
            label={'Email'}
            value={user?.email}
            placeholder={'abc@gm.uit.edu.vn'}
            onChange={() => {}}
            isDisabled
          />
          <Input
            label={'Tên'}
            value={user?.name}
            placeholder={''}
            onChange={() => {}}
            isDisabled
          />
          <Input
            label={'Giới tính'}
            value={user?.gender}
            placeholder={''}
            onChange={() => {}}
            isDisabled
          />
          <Input
            label={'Ngày sinh'}
            value={''}
            placeholder={''}
            onChange={() => {}}
            isDisabled
          />
          <TextArea
            label={'Tiểu sử'}
            value={user?.bio}
            placeholder={'Nói gì đó về bạn'}
            onChange={() => {}}
            isDisabled
          />
        </div>
      </div>
      <div className={cx('blog-section', 'section')}>
        <p className={cx('section-title')}>Liên kết mạng xã hội</p>
        <div className={cx('blog-body')}>
          <Button
            isPrimary={false}
            onClick={() => {}}
            className={cx('blog-button')}
          >
            Bài viết của tôi
          </Button>
          <Button
            isPrimary={false}
            onClick={() => {}}
            className={cx('blog-button')}
          >
            Câu hỏi của tôi
          </Button>
        </div>
      </div>
      <div className={cx('social-section', 'section')}>
        <p className={cx('section-title')}>Liên kết mạng xã hội</p>
        <div className={cx('social-body')}></div>
      </div>
      <div className={cx('account-section', 'section')}>
        <p className={cx('section-title')}>Tài khoản</p>
        <div className={cx('account-body')}>
          <Button
            isPrimary={false}
            onClick={() => {}}
            className={cx('account-button')}
          >
            Khóa tài khoản
          </Button>
        </div>
      </div>

      <Button isPrimary={false} onClick={() => {}} className={cx('log-out')}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default Profile;
