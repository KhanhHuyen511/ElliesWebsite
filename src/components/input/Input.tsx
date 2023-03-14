import React from "react";
import classNames from "classnames/bind";
import style from "./Input.module.scss";
const cx = classNames.bind(style);

interface Props {
  label: string;
  placeholder: string;
  type?: string;
  smallText?: string;
  isDisabled?: boolean;
  haveIcon?: boolean;
  icon?: string;
}

const Input = (props: Props) => {
  const inputProps = {
    type: props.type ? props.type : "text",
  };

  return (
    <div className={cx("input-wrapper")}>
      <p className={cx("label")}>{props.label}</p>
      <input
        type={inputProps.type}
        placeholder={props.placeholder}
        className={cx("input")}
      />
      {props.smallText && <p className={cx("small-text")}>{props.smallText}</p>}
    </div>
  );
};

export default Input;
