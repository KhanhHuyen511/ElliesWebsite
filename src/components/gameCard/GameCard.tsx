import React from "react";
import style from "./GameCard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const GameCard = () => {
  return (
    <div className={cx("card-wrapper")}>
      <img
        src="./images/game/driver-small.png"
        alt=""
        className={cx("driver")}
      />
      <p>Go home!</p>
      <img src="./images/game/house-small.png" alt="" className={cx("home")} />
      <div className={cx("homes-wrapper")}>
        <img
          src="./images/game/homes-small.png"
          alt=""
          className={cx("homes")}
        />
        <img
          src="./images/game/homes-small.png"
          alt=""
          className={cx("homes-1")}
        />
      </div>
    </div>
  );
};

export default GameCard;
