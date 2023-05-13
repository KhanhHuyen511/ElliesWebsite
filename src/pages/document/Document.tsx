import React from 'react';
import { Col } from 'react-flexbox-grid';
import styles from './Document.module.scss';
import classNames from 'classnames/bind';
import { CategoryPanel, DocCard } from '../../components';
import {
  AcademicCapIcon,
  BookOpenIcon,
  FireIcon,
  QueueListIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/outline';
const cx = classNames.bind(styles);

const Document = () => {
  return (
    <>
      <div className='container'>
        <Col xs={12} md={8} lg={6}>
          <p className={cx('page-title')}>Tài liệu</p>
          <ul className={cx('doc-cate-wrapper')}>
            <CategoryPanel
              label={'Vocabs'}
              isActive
              classNames={cx('cate-item')}
              icon={<AcademicCapIcon />}
            />
            <CategoryPanel
              label={'Sentences'}
              classNames={cx('cate-item')}
              icon={<QueueListIcon />}
            />
            <CategoryPanel
              label={'Audios'}
              classNames={cx('cate-item')}
              icon={<SpeakerWaveIcon />}
            />
            <CategoryPanel
              label={'Books'}
              classNames={cx('cate-item')}
              icon={<BookOpenIcon />}
            />
          </ul>
          <p className={cx('sub-title')}>Nổi bật</p>
          <ul className={cx('list')}>
            <DocCard />
          </ul>
        </Col>
      </div>
    </>
  );
};

export default Document;
