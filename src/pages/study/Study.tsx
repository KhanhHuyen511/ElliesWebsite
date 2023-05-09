import { useEffect, useState } from 'react';
import styles from './Study.module.scss';
import { Route, CheckinPanel } from '../../components';
import classNames from 'classnames/bind';
import { Col } from 'react-flexbox-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  getCheckedInDays,
  getStudiedRoutes,
  getStudyRoutes,
  setCheckInToday,
} from '../../redux/slice/studySlice';
import { useNavigate } from 'react-router-dom';
import { StudyRoute } from '../../types';
const cx = classNames.bind(styles);

const Study = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // get checked days in this week from Firebase
  const routes = useSelector((state: RootState) => state.study.studyRoutes); // show 4 routes
  const storeDays = useSelector(
    (state: RootState) => state.study.checkedInDays
  );
  const userID = useSelector((state: RootState) => state.auth.userID) || '';
  const studiedRouteIDs = useSelector(
    (state: RootState) => state.study.studiedRouteIDs
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
      tempdays.push(dd.getDay() < 1 ? dd.getDay() + 6 : dd.getDay() - 1);
    }
  });

  useEffect(() => {
    dispatch(getStudyRoutes());
    dispatch(getStudiedRoutes(userID));
    dispatch(getCheckedInDays(userID));
  }, [dispatch, isCheckedIn, userID]);

  const CheckIn = (item: number) => {
    // check if item is current day
    if (
      !isCheckedIn &&
      item === (d.getDay() < 1 ? d.getDay() + 6 : d.getDay() - 1)
    ) {
      dispatch(setCheckInToday({ day: d, userID }));
      setIsCheckedIn(true);
    }
  };

  const GetStateCheckIn = (day: number) => {
    return day === (d.getDay() < 1 ? d.getDay() + 6 : d.getDay() - 1)
      ? 'current'
      : day <= (d.getDay() < 1 ? d.getDay() + 6 : d.getDay() - 1)
      ? 'before'
      : 'default';
  };

  const CheckCheckedDays = (day: number) => {
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

  var currentRouteIndex = 0;

  const CheckRouteState = (route: StudyRoute, index: number) => {
    if (index === currentRouteIndex) return 'active';
    if (route.id && studiedRouteIDs.indexOf(route.id) >= 0) {
      currentRouteIndex = index + 1;
    }
    return 'default';
  };

  const generateRouteList = routes.map(
    (item, index) =>
      item.id && (
        <li
          className={cx('route-study-item')}
          onClick={() => {
            if (CheckRouteState(item, index + 1) === 'active')
              navigate(`/study_detail/${item.id}`);
          }}
        >
          <Route
            id={item.id}
            label={'Chặng ' + item.name}
            state={CheckRouteState(item, index + 1)}
          />
        </li>
      )
  );

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
