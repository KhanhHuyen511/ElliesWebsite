import React from "react";
import classNames from "classnames/bind";
import style from "./CheckinPanel.module.scss";
import { FireIcon } from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

interface Props {
  isActive?: boolean;
}

const CheckinPanel = (props: Props) => {
  return (
    <div className={cx("wrapper", { active: props.isActive })}>
      <FireIcon className={cx("icon")} />
      <p className={cx("label")}>day</p>
    </div>
  );
};

export default CheckinPanel;
