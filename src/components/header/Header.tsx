import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames/bind';
import Navbar from '../navbar/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useDispatch } from 'react-redux/es/exports';
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [showAuthWrapper, setShowAuthWrapper] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const toggleAuthWrapper = () => {
    setShowAuthWrapper(!showAuthWrapper);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const index = user.email?.indexOf('@');
          const tempName = user.email?.substring(0, index);

          if (tempName) {
            setCurrentUserName(
              tempName?.charAt(0).toUpperCase() + tempName?.slice(1)
            );
            console.log(tempName);
          }
        } else {
          setCurrentUserName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : currentUserName,
            userID: user.uid,
          })
        );
      } else {
        setCurrentUserName('');
        REMOVE_ACTIVE_USER({});
      }
    });
  }, [dispatch, currentUserName]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfull!');
        navigate('/login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className={cx('header')}>
      <Bars3CenterLeftIcon
        className={cx('navbar-icon', 'icon')}
        onClick={toggleMenu}
      ></Bars3CenterLeftIcon>

      <div className={cx('logo-text')}>Ellies</div>

      {showMenu && (
        <div className={cx('slider-container')}>
          <div className={cx('back-slide')}>
            <ChevronLeftIcon
              onClick={hideMenu}
              className={cx('back-slide-icon', 'icon')}
            />
          </div>
          <Navbar isSlider={true} />
        </div>
      )}

      {showMenu && <div className={cx('modal')}></div>}

      <div className={cx('navbar')}>
        <Navbar isSlider={false} />
      </div>

      <div className={cx('profile')}>
        <div
          className={cx('user-name-wrapper')}
          onClick={() => toggleAuthWrapper()}
        >
          <span className={cx('user-name')}>
            Hi {currentUserName ? currentUserName : 'user'}
          </span>
          <ChevronDownIcon
            className={cx('dropdown-icon', 'icon', {
              checked: showAuthWrapper,
            })}
          />
          {showAuthWrapper && (
            <ul className={cx('auth-wrapper')}>
              {currentUserName ? (
                <li onClick={logout} className={cx('auth-item')}>
                  Đăng xuất
                </li>
              ) : (
                <>
                  <NavLink to='/login' className={cx('auth-item')}>
                    Đăng nhập
                  </NavLink>
                  <NavLink to='/register' className={cx('auth-item')}>
                    Đăng kí
                  </NavLink>
                </>
              )}
            </ul>
          )}
        </div>
        <UserCircleIcon className={cx('profile-icon', 'icon')} />
      </div>
    </div>
  );
};

export default Header;
