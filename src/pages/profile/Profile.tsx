import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { FireIcon } from '@heroicons/react/24/outline';
import { Button, Input, TextArea } from '../../components';
const cx = classNames.bind(style);

const Profile = () => {
  const userID = useSelector((state: RootState) => state.auth.userID) || '';
  return (
    <div className='container'>
      <p className={cx('user-name')}>Ellie Nguyen</p>
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
        <p className={cx('section-title')}>Thông tin cá nhân</p>
        <div className={cx('info-body')}>
          <Input
            label={'Email'}
            placeholder={'abc@gm.uit.edu.vn'}
            onChange={() => {}}
          />
          <Input label={'Giới tính'} placeholder={''} onChange={() => {}} />
          <Input label={'Ngày sinh'} placeholder={''} onChange={() => {}} />
          <TextArea
            label={'Tiểu sử'}
            placeholder={'Nói gì đó về bạn'}
            onChange={() => {}}
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
