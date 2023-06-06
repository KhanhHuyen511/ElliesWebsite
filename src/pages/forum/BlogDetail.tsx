import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './BlogDetail.module.scss';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getABlog, setAComment } from '../../redux/slice/forumSlice';
import { Comment } from '../../components';
import { BlogComment } from '../../types';
const cx = classNames.bind(style);

const BlogDetail = () => {
  let { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.forum.currentBlog);

  useEffect(() => {
    if (id) dispatch(getABlog(id));
  }, [dispatch, id]);

  return (
    <div className='container'>
      <p className={cx('title')}>{data?.title}</p>
      <div className={cx('blog-info')}>
        <span className={cx('author')}>{data?.userName}</span>
        <div className={cx('other-infos')}>
          <span className={cx('create-date')}>
            {data?.createDate?.toLocaleDateString()}
          </span>
          <div className={cx('like-wrapper')}>
            <HandThumbUpIcon
              className={cx('like-icon')}
              width={20}
              height={20}
            />
            <p className={cx('like-number')}>5</p>
          </div>
        </div>
      </div>
      <p className={cx('summary')}>{data?.summary}</p>
      {data?.content && (
        <p
          dangerouslySetInnerHTML={{ __html: data?.content }}
          className={cx('content')}
        ></p>
      )}

      <p className={cx('keyword-wrapper')}>
        Từ khoá: <span className={cx('keyword')}>#{data?.keyword}</span>
      </p>

      <div className={cx('comment-section')}>
        <p className={cx('sub-title')}>Bình luận</p>
        <ul className={cx('comments')}>
          <li>
            <Comment blogId={id}></Comment>
          </li>
          {data?.comments &&
            data.comments.map((item, index) => (
              <li key={index}>
                <Comment data={item}></Comment>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetail;
