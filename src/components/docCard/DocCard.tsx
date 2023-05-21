import React from 'react';
import styles from './DocCard.module.scss';
import classNames from 'classnames/bind';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Doc } from '../../types';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const DocCard = ({ data }: { data: Doc }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx('card')}
        onClick={() => navigate(`/doc_detail/${data.id}`)}
      >
        <p className={cx('card-title')}>{data.title}</p>
        <div className={cx('card-body')}>
          <div className={cx('card-content')}>
            <p className={cx('card-desc')}>{data.description}</p>
            <p className={cx('card-date')}>
              {/* 03/03/2023 */}
              {data.createDate?.toLocaleDateString()}
            </p>
          </div>
          <BookOpenIcon className='icon' width={52} height={52} />
        </div>
      </div>
    </>
  );
};

export default DocCard;
