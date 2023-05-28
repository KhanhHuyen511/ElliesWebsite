import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { FireIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Button, Input, TextArea } from '../../components';
import EditProfile from './EditProfile';
import {
  getCurrentStudent,
  updateAvatar,
} from '../../redux/slice/studentSlice';
import { formatDate } from '../../utils';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/config';
const cx = classNames.bind(style);

const Profile = () => {
  const userID = useSelector((state: RootState) => state.auth.userID) || '';

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.student.currentUser);

  const [isOpenEditForm, setISOpenEditForm] = useState<boolean>(false);
  const [img, setImg] = useState('');
  const [newImg, setNewImg] = useState<File>();

  useEffect(() => {
    dispatch(getCurrentStudent(userID));
    if (user?.avatar)
      getDownloadURL(ref(storage, `images/${user.avatar}`)).then((url) => {
        setImg(url);
      });
  }, [dispatch, userID, user]);

  return (
    <>
      <div className={'container'}>
        <p className={cx('user-name')}>{user?.name}</p>
        <div className={cx('section-1')}>
          <div className={cx('avatar-wrapper')}>
            <div className={cx('avatar')}>
              <img
                src={
                  newImg
                    ? URL.createObjectURL(newImg)
                    : img
                    ? img
                    : '/images/avatar.png'
                }
                className={cx('avatar-img')}
                alt=''
              />
            </div>
            <Input
              type='file'
              onChange={(e) => {
                if (e.target.files) setNewImg(e.target.files[0]);
              }}
              label={''}
              placeholder={''}
            ></Input>
            <Button
              isPrimary={false}
              onClick={() => {
                if (user && newImg)
                  dispatch(updateAvatar({ data: user, newAvatar: newImg }));
              }}
            >
              Cập nhật ảnh
            </Button>
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
            <PencilIcon
              className={cx('edit-icon')}
              onClick={() => setISOpenEditForm(true)}
            />
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
              type='date'
              value={user?.birthday ? formatDate(user?.birthday) : undefined}
              placeholder={''}
              onChange={(e) => {}}
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

        {isOpenEditForm && user && (
          <EditProfile
            data={user}
            isDisplay={isOpenEditForm}
            onClose={() => setISOpenEditForm(false)}
          ></EditProfile>
        )}
      </div>
    </>
  );
};

export default Profile;
