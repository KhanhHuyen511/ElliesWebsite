import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames/bind";
import React from "react";
import style from "./Button.module.scss";
const cx = classNames.bind(style);

interface Props {
  type?: string;
  isPrimary: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  haveIcon?: boolean;
  icon?: string;
  isDanger?: boolean;
  isDisabled?: boolean;
  preventDefault?: boolean;
  className?: string;
}

const Button = (props: Props) => {
  return (
    <button
      onClick={(e) => {
        if (props.preventDefault) e.preventDefault();
        props.onClick && props.onClick();
      }}
      className={cx(
        "btn",
        { primary: props.isPrimary },
        { danger: props.isDanger },
        { disable: props.isDisabled },
        props.className
      )}
      disabled={props.isDisabled}
    >
      {props.children}
      {props.haveIcon && (
        <ArrowSmallRightIcon
          width={32}
          height={32}
          className={cx("icon", "right-icon")}
        />
      )}
      {props.icon === "boilt" && (
        <BoltIcon width={32} height={32} className={cx("icon", "right-icon")} />
      )}
      {props.icon === "prev" && (
        <ArrowSmallLeftIcon
          width={32}
          height={32}
          className={cx("icon", "right-icon")}
        />
      )}
    </button>
  );
};

export default Button;
