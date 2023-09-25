import React from "react";
import style from "./RankItem.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const RankItem = ({
  rank,
  name,
  avt,
  point,
}: {
  rank: number;
  name: string;
  avt: string;
  point: number;
}) => {
  return (
    <div className={cx("item")}>
      <div className={cx("avt", { second: rank === 2 }, { third: rank === 3 })}>
        <img src={avt} alt="" />
        <span>{rank}</span>
      </div>
      <p className={cx("name")}>{name}</p>
      <p className={cx("point")}>Point: {point}</p>
    </div>
  );
};

export default RankItem;
