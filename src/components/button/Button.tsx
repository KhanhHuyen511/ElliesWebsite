import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames/bind";
import React from "react";
import style from "./Button.module.scss";
const cx = classNames.bind(style);

interface Props {
  type?: string;
  isPrimary: boolean;
  onClick: () => void;
  children?: string;
  haveIcon?: boolean;
  icon?: string;
}

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={cx("btn", { primary: props.isPrimary })}
    >
      {props.children}
      {props.haveIcon && (
        <ArrowSmallRightIcon className={cx("icon", "right-icon")} />
      )}
    </button>
  );
};

export default Button;
