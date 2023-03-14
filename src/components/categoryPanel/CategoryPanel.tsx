import React from "react";
import classNames from "classnames/bind";
import style from "./CategoryPanel.module.scss";
import { FireIcon } from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

interface Props {
  isActive?: boolean;
  label: string;
}

const CategoryPanel = (props: Props) => {
  return (
    <div className={cx("wrapper", { active: props.isActive })}>
      <FireIcon className={cx("icon")} />
      <p className={cx("label")}>{props.label}</p>
    </div>
  );
};

export default CategoryPanel;
