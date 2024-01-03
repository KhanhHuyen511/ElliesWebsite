import React from "react";
import style from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const cx = classNames.bind(style);

const CommonFigure = () => {
  const blogFigure = useSelector(
    (state: RootState) => state.dashboard.blogFigure
  );
  const newStudentFigure = useSelector(
    (state: RootState) => state.dashboard.accountFigure
  );

  return (
    <>
      <ul className={cx("figure-list")}>
        <li className={cx("item")}>
          <p className={cx("figure-title")}>Posted Post</p>
          <p className={cx("figure-value")}>{blogFigure[0]}</p>
        </li>
        <li className={cx("item")}>
          <p className={cx("figure-title")}>Pending Post</p>
          <p className={cx("figure-value")}>{blogFigure[1]}</p>
        </li>
        <li className={cx("item")}>
          <p className={cx("figure-title")}>Today Post</p>
          <p className={cx("figure-value")}>{blogFigure[2]}</p>
        </li>
        <li className={cx("item")}>
          <p className={cx("figure-title")}>New Students</p>
          <p className={cx("figure-value")}>{newStudentFigure}</p>
        </li>
      </ul>
    </>
  );
};

export default CommonFigure;
