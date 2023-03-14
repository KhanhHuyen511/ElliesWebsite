import React from "react";
import classNames from "classnames/bind";
import style from "./AnswerPanel.module.scss";
const cx = classNames.bind(style);

interface Props {
  isActive?: boolean;
  children?: string;
}

const AnswerPanel = (props: Props) => {
  return (
    <div className={cx("wrapper", { active: props.isActive })}>
      {props.children}
    </div>
  );
};

export default AnswerPanel;
