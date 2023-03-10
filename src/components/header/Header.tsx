import React, { useState } from "react";
import style from "./Header.module.scss";
import {
  Bars3CenterLeftIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames/bind";
import Navbar from "../navbar/Navbar";
const cx = classNames.bind(style);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={cx("header")}>
      <Bars3CenterLeftIcon
        className={cx("navbar-icon", "icon")}
        onClick={toggleMenu}
      ></Bars3CenterLeftIcon>

      <div className={cx("logo-text")}>Ellies</div>

      {showMenu && (
        <div className={cx("slider-container")}>
          <div className={cx("back-slide")}>
            <ChevronLeftIcon
              onClick={hideMenu}
              className={cx("back-slide-icon", "icon")}
            />
          </div>
          <Navbar isSlider={true} />
        </div>
      )}

      {showMenu && <div className={cx("modal")}></div>}

      <div className={cx("navbar")}>
        <Navbar isSlider={false} />
      </div>

      <div className={cx("profile")}>
        <UserCircleIcon className={cx("profile-icon", "icon")}></UserCircleIcon>
      </div>
    </div>
  );
};

export default Header;
