import { useEffect, useState } from 'react';
import styles from './Study.module.scss';
import { StudyRoute, CheckinPanel } from '../../components';
import classNames from 'classnames/bind';
import { Col } from 'react-flexbox-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  getCheckedInDays,
  getStudyRoutes,
  setCheckInToday,
} from '../../redux/slice/studySlice';
const cx = classNames.bind(styles);

const Study = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // get checked days in this week from Firebase
  const routes = useSelector((state: RootState) => state.study.studyRoutes); // show 4 routes
  const storeDays = useSelector(
    (state: RootState) => state.study.checkedInDays
  );

  const days = [0, 1, 2, 3, 4, 5, 6]; // 7 days in a week, order from 1 to 7

  var tempdays: number[] = [];

  const d = new Date();

  days.forEach((e) => {
    const dd = new Date();
    if (d.getDay() - e - 1 > 0) {
      dd.setDate(d.getDate() - e - 1);
    } else {
      dd.setDate(d.getDate() - e + 6);
    }
    if (storeDays.indexOf(dd.toLocaleDateString()) >= 0) {
      tempdays.push(dd.getDay() < 1 ? dd.getDay() + 5 : dd.getDay() - 1);
    }
  });

  console.log(tempdays);

  useEffect(() => {
    dispatch(getStudyRoutes());
    dispatch(getCheckedInDays());
  }, [dispatch, isCheckedIn]);

  const CheckIn = (item: number) => {
    // check if item is current day
    if (
      !isCheckedIn &&
      item === (d.getDay() < 1 ? d.getDay() + 6 : d.getDay() - 1)
    ) {
      dispatch(setCheckInToday(d));
      setIsCheckedIn(true);
    }
  };

  const GetStateCheckIn = (day: number) => {
    return day === (d.getDay() < 1 ? d.getDay() + 6 : d.getDay() - 1)
      ? 'current'
      : day <= (d.getDay() < 1 ? d.getDay() + 5 : d.getDay() - 1)
      ? 'before'
      : 'default';
  };

  const CheckCheckedDays = (day: number) => {
    // if (isCheckedIn && day === d.getDay()) return true;
    return tempdays.indexOf(day) >= 0;
  };

  const generateCheckInList = days.map((item, index) => (
    <li className={cx('check-in-item')} onClick={() => CheckIn(item)}>
      <CheckinPanel
        label={'day' + (item + 1)}
        isChecked={CheckCheckedDays(item)}
        state={GetStateCheckIn(item)}
      />
    </li>
  ));

  const generateRouteList = routes.map((item, index) => (
    <li className={cx('route-study-item')}>
      <StudyRoute label={'Chặng ' + item.name} />
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
