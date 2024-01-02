import React, { useState } from "react";
import style from "./RankItem.module.scss";
import classNames from "classnames/bind";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
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
  const [avatar, setAvatar] = useState<string>();

  if (avt)
    getDownloadURL(ref(storage, `images/${avt}`)).then((url) => {
      setAvatar(url);
    });

  return (
    <div className={cx("item")}>
      <div className={cx("avt", { second: rank === 2 }, { third: rank === 3 })}>
        <img src={avatar ? avatar : "/images/avatar.png"} alt="" />
        <span>{rank}</span>
      </div>
      <p className={cx("name")}>{name}</p>
      <p className={cx("point")}>Point: {point}</p>
    </div>
  );
};

export default RankItem;
