import React from 'react';
import { Ex, UserEx } from '../../types';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import style from './ExCard.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const ExCard = ({ data }: { data: Ex }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx('card')}
        onClick={() => navigate(`/ex_detail/${data.id}`)}
      >
        <p className={cx('card-title')}>{data.title}</p>
        <div className={cx('card-body')}>
          <div className={cx('card-content')}>
            <p className={cx('card-desc')}>{data.description}</p>
          </div>
          <BookOpenIcon className='icon' width={52} height={52} />
        </div>
      </div>
    </>
  );
};

export default ExCard;
