import React from "react";
import style from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const cx = classNames.bind(style);

const links = [
  {
    to: "/dashboard",
    title: "Dashboard",
  },
  {
    to: "/study",
    title: "Study",
  },
  {
    to: "/document",
    title: "Document",
  },
  {
    to: "/exercise",
    title: "Exercise",
  },
  {
    to: "/forum",
    title: "Forum",
  },
  {
    to: "/saved",
    title: "Saved",
  },
];

const adminLinks = [
  {
    to: "/dashboard",
    title: "Dashboard",
  },
  {
    to: "/study",
    title: "Study",
  },
  {
    to: "/document",
    title: "Document",
  },
  {
    to: "/exercise",
    title: "Exercise",
  },
  {
    to: "/forum",
    title: "Forum",
  },
  {
    to: "/manage_users",
    title: "Users",
  },
];

const getLinks = (role: string) => {
  const array = role === "admin" ? adminLinks : links;
  return array.map((link) => (
    <li>
      <NavLink
        to={link.to}
        className={({ isActive }) => cx("nav-link", { active: isActive })}
      >
        {link.title}
      </NavLink>
    </li>
  ));
};

const getLinksSlide = (role: string) => {
  const array = role === "admin" ? adminLinks : links;
  return array.map((link) => (
    <li className={cx("nav-item")}>
      <NavLink
        to={link.to}
        className={({ isActive }) => cx("nav-link", { active: isActive })}
      >
        {link.title}
      </NavLink>
    </li>
  ));
};

const Navbar = ({ isSlider }: { isSlider: boolean }) => {
  const uRole = useSelector((state: RootState) => state.auth.userRole);

  return (
    <nav>
      {uRole === "" ? (
        <></>
      ) : !isSlider ? (
        <ul className={cx("navbar-container")}>{getLinks(uRole)}</ul>
      ) : (
        <ul className={cx("navbar-container", "slider")}>
          {getLinksSlide(uRole)}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
