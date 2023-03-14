import React from "react";
import classNames from "classnames/bind";
import style from "./StudyRoute.module.scss";
const cx = classNames.bind(style);

interface Props {
  label: string;
  state?: "default" | "active" | "future" | undefined;
}

const StudyRoute = (props: Props) => {
  return (
    <div className={cx("wrapper", props.state)}>
      <div className={cx("route")}></div>
      <p className={cx("label")}>{props.label}</p>
    </div>
  );
};

export default StudyRoute;
