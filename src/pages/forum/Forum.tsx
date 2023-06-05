import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './Forum.module.scss';
import { Col } from 'react-flexbox-grid';
import { BlogCard, Button, CategoryPanel } from '../../components';
import {
  AcademicCapIcon,
  FireIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getListBlogs } from '../../redux/slice/forumSlice';
const cx = classNames.bind(style);

const Forum = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const list = useSelector((state: RootState) => state.forum.listBlogs);

  useEffect(() => {
    dispatch(getListBlogs());
  }, [dispatch]);

  return (
    <>
      <div className='container'>
        <Col xs={12} md={8} lg={6}>
          <p className={cx('title')}>Diễn đàn</p>
          <ul className={cx('')}>{}</ul>
        </Col>

        <ul className={cx('forum-cate-wrapper')}>
          <CategoryPanel
            label={'Bài viết'}
            isActive
            classNames={cx('cate-item')}
            icon={<AcademicCapIcon />}
          />
          <CategoryPanel
            label={'Câu hỏi'}
            classNames={cx('cate-item')}
            icon={<QuestionMarkCircleIcon />}
          />
          <CategoryPanel
            label={'Của bạn'}
            classNames={cx('cate-item')}
            icon={<FireIcon />}
          />
        </ul>
        <div className={cx('create-wrapper')}>
          <p className={cx('sub-title')}>Nổi bật</p>
          <Button
            isPrimary={true}
            onClick={() => {
              navigate('/forum/create');
            }}
          >
            Tạo mới
          </Button>
        </div>

        <ul className={cx('list')}>
          {list &&
            list.length > 0 &&
            list.map((item, index) => (
              <li key={index} className={cx('item')}>
                <BlogCard data={item} />
              </li>
            ))}

          {/* {exs &&
            exs.length > 0 &&
            exs.map((item, index) => (
              <li key={index} className={cx('item')}>
                <ExCard data={item} />
              </li>
            ))} */}
        </ul>
      </div>
    </>
  );
};

export default Forum;
