import React from "react";
import style from "./StudentDashboard.module.scss";
import classNames from "classnames/bind";
import DashboardItem from "./DashboardItem";
const cx = classNames.bind(style);

const StudentDashboard = () => {
  return (
    <div className={cx("container", "wrapper")}>
      <p className={cx("page-title")}>Dashboard</p>
      <div className={cx("list-wrapper")}>
        <ul className={cx("dashboard-list")}>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: "20",
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
                label: "05",
                unit: "successfully upload",
                name: "Posts",
                color: "Y500",
              }}
            />
          </li>
          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 20,
                label: "06/20",
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
                label: "BASIC",
                unit: "..",
                name: "Level",
                color: "G450",
              }}
            />
          </li>

          <li className={cx("dashboard-item")}>
            <DashboardItem
              data={{
                value: 83,
                label: "83",
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
                label: "06",
                unit: "words/sentences",
                name: "Saved",
                color: "Y500",
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
