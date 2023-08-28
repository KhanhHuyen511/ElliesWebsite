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
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  isRequired?: boolean;
  className?: string;
  rowDirection?: boolean;
  noMargin?: boolean;
}

const Input = (props: Props) => {
  const inputProps = {
    type: props.type ? props.type : "text",
    placeholder: props.placeholder ? props.placeholder : "...",
  };

  return (
    <div
      className={cx(
        "input-wrapper",
        props.className,
        {
          "row-direction": props.rowDirection,
        },
        { "no-margin": props.noMargin }
      )}
    >
      <p className={cx("label")}>{props.label}</p>
      <input
        type={inputProps.type}
        placeholder={inputProps.placeholder}
        className={cx("input")}
        onChange={props.onChange}
        value={props.value}
        required={props.isRequired}
        disabled={props.isDisabled}
      />
      {props.smallText && <p className={cx("small-text")}>{props.smallText}</p>}
    </div>
  );
};

export default Input;
