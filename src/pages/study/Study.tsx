import React, { useState } from 'react';
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
  const [checkedDays, setCheckedDays] = useState(-2);
  const [currentRoute, setCurrentRoute] = useState(-2);

  // get checked days in this week from Firebase

  const days = [1, 2, 3, 4, 5, 6, 7]; // 7 days in a week, order from 1 to 7
  const routes = [8, 9, 10, 11]; // show 4 routes

  const d = new Date();
  console.log(d.getDay());
  console.log(checkedDays);

  const CheckIn = (item: number) => {
    // check if item is current day
    if (item === d.getDay() + 6) setCheckedDays(item);
  };

  const GetStateCheckIn = (day: number) => {
    return day === d.getDay() + 6
      ? 'current'
      : day <= d.getDay() + 5
      ? 'before'
      : 'default';
  };

  const CheckCheckedDays = (day: number) => {
    return day === checkedDays;
  };

  const GetCurrentRoute = () => {};

  const generateCheckInList = days.map((item, index) => (
    <li className={cx('check-in-item')} onClick={() => CheckIn(item)}>
      <CheckinPanel
        label={'day' + item}
        isChecked={CheckCheckedDays(item)}
        state={GetStateCheckIn(item)}
      />
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
