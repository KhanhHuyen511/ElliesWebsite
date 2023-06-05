import React from 'react';
import classNames from 'classnames/bind';
import style from './BlogCard.module.scss';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { Blog } from '../../types';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const BlogCard = ({ data }: { data: Blog }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx('card')}
        onClick={() => navigate(`/blog_detail/${data.id}`)}
      >
        <p className={cx('card-title')}>{data.title}</p>
        <div className={cx('card-body')}>
          <div className={cx('card-content')}>
            {data.summary && (
              <p
                className={cx('card-desc')}
                dangerouslySetInnerHTML={{ __html: data.summary }}
              ></p>
            )}

            <p className={cx('card-date')}>
              {data.createDate?.toLocaleDateString()}
              <span className={cx('card-keyword-wrapper')}>
                Từ khoá: <span className={cx('keyword')}>#{data.keyword}</span>
              </span>
            </p>
          </div>
          <div className={cx('like-wrapper')}>
            <HandThumbUpIcon className='like-icon' width={24} height={24} />
            <p className={cx('like-number')}>{data.likes?.length}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
