import React from "react";
import style from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { Link, NavLink } from "react-router-dom";
const cx = classNames.bind(style);

const Navbar = ({ isSlider }: { isSlider: boolean }) => {
  return (
    <nav>
      {!isSlider ? (
        <ul className={cx("navbar-container")}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/document"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Tài liệu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/exercise"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Luyện tập
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/forum"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Diễn đàn
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className={cx("navbar-container", "slider")}>
          <li className={cx("nav-item")}>
            <NavLink
              to="/"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Trang chủ
            </NavLink>
          </li>
          <li className={cx("nav-item")}>
            <NavLink
              to="/document"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Tài liệu
            </NavLink>
          </li>
          <li className={cx("nav-item")}>
            <NavLink
              to="/exercise"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Luyện tập
            </NavLink>
          </li>
          <li className={cx("nav-item")}>
            <NavLink
              to="/forum"
              className={({ isActive }) => cx("nav-link", { active: isActive })}
            >
              Diễn đàn
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
