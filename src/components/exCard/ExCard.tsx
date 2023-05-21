import React from 'react';
import { Ex, UserEx } from '../../types';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import style from './ExCard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const ExCard = ({ data }: { data: UserEx }) => {
  const calculateRightQn = () => {
    let rs = 0;
    data.resultList.forEach((item) => {
      if (item.exRight) rs++;
    });

    return rs;
  };

  return (
    <>
      <div
        className={cx('card')}
        // onClick={() => navigate(`/doc_detail/${data.id}`)}
      >
        <p className={cx('card-title')}>{data.ex.title}</p>
        <div className={cx('card-body')}>
          <div className={cx('card-content')}>
            <p className={cx('card-right')}>
              Số câu đúng: {calculateRightQn()} /{data.resultList.length}
            </p>
            <p className={cx('card-archive')}>Thành tích: {}</p>
            <p className={cx('card-date')}>{data.didDate?.toLocaleString()}</p>
          </div>
          <BookOpenIcon className='icon' width={52} height={52} />
        </div>
      </div>
    </>
  );
};

export default ExCard;
