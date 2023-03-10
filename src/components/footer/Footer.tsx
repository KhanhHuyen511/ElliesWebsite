import classNames from "classnames/bind";
import React from "react";
import style from "./Footer.module.scss";
const cx = classNames.bind(style);

const Footer = () => {
  return (
    <div className={cx("footer")}>
      Terms & Conditions
      <embed src="images/facebook-icon.svg"></embed>
    </div>
  );
};

export default Footer;
