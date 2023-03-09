import React from "react";
import style from "./Header.module.scss";
import { BeakerIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className={style.test}>
      hi
      <BeakerIcon className={style.icon}></BeakerIcon>
    </div>
  );
};

export default Header;
