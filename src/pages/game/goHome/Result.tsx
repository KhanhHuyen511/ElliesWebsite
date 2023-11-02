import React from "react";
import style from "./GoHome.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

const Result = () => {
  return (
    <div className={cx("result-wrapper")}>
      <p>Game Result</p>
    </div>
  );
};

export default Result;
