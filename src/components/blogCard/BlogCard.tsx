import React from 'react';
import classNames from 'classnames/bind';
import style from './BlogCard.module.scss';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { Blog } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { removeALike, setALike } from '../../redux/slice/forumSlice';
const cx = classNames.bind(style);

const BlogCard = ({ data }: { data: Blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userID = useSelector((state: RootState) => state.auth.userID);

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
            <HandThumbUpIcon
              className={cx('like-icon', {
                active: data?.likes?.find((o) => o.userId === userID),
              })}
              width={24}
              height={24}
              onClick={(e) => {
                e.stopPropagation();
                if (userID && data.id && data.userId !== userID) {
                  if (
                    data?.likes?.find((o) => o.userId === userID) === undefined
                  )
                    dispatch(
                      setALike({
                        userId: userID,
                        id: '',
                        blogId: data.id,
                        createDate: new Date(),
                      })
                    );
                  else {
                    dispatch(
                      removeALike({
                        userId: userID,
                        id: '',
                        blogId: data.id,
                        createDate: new Date(),
                      })
                    );
                  }
                }
              }}
            />
            <p className={cx('like-number')}>{data.likes?.length}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
