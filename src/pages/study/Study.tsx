import React from 'react';
import styles from './Study.module.scss';
import {
  Button,
  Input,
  StudyRoute,
  CheckinPanel,
  CategoryPanel,
  AnswerPanel,
} from '../../components';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-flexbox-grid';
const cx = classNames.bind(styles);

const Study = () => {
  const days = [1, 2, 3, 4, 5, 6, 7];
  const routes = [8, 9, 10, 11];

  const generateCheckInList = days.map((item, index) => (
    <li className={cx('check-in-item')}>
      <CheckinPanel label={'day' + item} />
    </li>
  ));

  const generateRouteList = routes.map((item, index) => (
    <li className={cx('route-study-item')}>
      <StudyRoute label={'Chặng' + item} />
    </li>
  ));

  return (
    <div className='container'>
      <Col xs={12} md={8} lg={6}>
        <p className={cx('title')}>Chào Huyền,</p>
        <ul className={cx('check-in-wrapper')}>{generateCheckInList}</ul>
        <p className={cx('page-title')}>Lộ trình</p>
        <ul className={cx('route-study-wrapper')}>{generateRouteList}</ul>
      </Col>
    </div>
  );
};

export default Study;
