import React, { useEffect } from "react";
import style from "./StudentDashboard.module.scss";
import classNames from "classnames/bind";
import DashboardItem from "./DashboardItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Account, BlogState, LevelType, Student } from "../../types";
import { getListBlogsByUserId } from "../../redux/slice/forumSlice";
import {
  getCurrentAccount,
  getCurrentStudent,
} from "../../redux/slice/studentSlice";
import { getStudyRoutesDashboard } from "../../redux/slice/studySlice";
import { getExePercent } from "../../redux/slice/exSlice";
const cx = classNames.bind(style);

const StudentDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userID = useSelector((state: RootState) => state.auth.userID);

  const user = useSelector(
    (state: RootState) => state.student.currentUser
  ) as Student;

  const account = useSelector(
    (state: RootState) => state.student.currentAccount
  ) as Account;

  const posts = useSelector((state: RootState) => state.forum.listUserBlogs);

  const routes = useSelector((state: RootState) => state.study.routesDashboard);

  const exPercent = useSelector((state: RootState) => state.ex.exDashboard);

  useEffect(() => {
    if (userID) {
      dispatch(getCurrentStudent(userID));
      dispatch(getListBlogsByUserId(userID));
      dispatch(getCurrentAccount(userID));
      dispatch(getStudyRoutesDashboard(userID));
      dispatch(getExePercent(userID));
    }
  }, [userID, dispatch]);

  const getStudiedPercent = () => {
    return routes !== undefined ? routes : 0;
  };

  const getCheckinValue = () => {
    return `${user?.checkinDays?.length}/${Math.ceil(
      Math.abs(new Date().getTime() - account?.create_date.getTime()) /
        (1000 * 24 * 60 * 60)
    )}`;
  };

  const getExPercent = () => {
    return exPercent !== undefined ? Math.round(exPercent) : 0;
  };

  const getLevel = () => {
    return `${
      user?.level !== undefined ? LevelType[user?.level].toUpperCase() : "none"
    }`;
  };

  const getPostedPostValue = () => {
    return `${posts?.filter((o) => o.state === BlogState.Posted).length}`;
  };

  const getPendingPostValue = () => {
    return `${posts?.filter((o) => o.state === BlogState.Pending).length}`;
  };

  const getSavedValue = () => {
    return `${user?.savedList?.length}`;
  };

  return (
    <div className={cx("container", "wrapper")}>
      <p className={cx("page-title")}>Dashboard</p>
      <div className={cx("list-wrapper")}>
        <ul className={cx("dashboard-list")}>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: getStudiedPercent(),
                label: `${getStudiedPercent()}`,
                unit: "%",
                name: "Studied",
                color: "O500",
              }}
              isShowCircle
            />
          </li>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: getPostedPostValue(),
                unit: "successfully upload",
                name: "Posts",
                color: "GR400",
              }}
            />
          </li>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: getPendingPostValue(),
                unit: "pending",
                name: "Posts",
                color: "Y500",
              }}
            />
          </li>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: getCheckinValue(),
                unit: "days",
                name: "Checkin",
                color: "Y500",
              }}
            />
          </li>
        </ul>
        <ul className={cx("dashboard-list")}>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: getLevel(),
                unit: "..",
                name: "Level",
                color: "G450",
              }}
            />
          </li>

          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: getExPercent(),
                label: `${getExPercent()}`,
                unit: "%",
                name: "Good Exercise",
                color: "BL400",
              }}
              isShowCircle
            />
          </li>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: getSavedValue(),
                unit: "words/sentences",
                name: "Saved",
                color: "O500",
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
