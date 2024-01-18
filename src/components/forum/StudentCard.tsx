import React, { useState } from "react";
import style from "./StudentCard.module.scss";
import classNames from "classnames/bind";
import { LevelType, Student } from "../../types";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { CheckBadgeIcon, TrophyIcon } from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

const StudentCard = ({
  data,
  onClick,
}: {
  data: Student;
  onClick: () => void;
}) => {
  const [avatar, setAvatar] = useState("");

  if (data.avatar)
    getDownloadURL(ref(storage, `images/${data.avatar}`)).then((url) => {
      setAvatar(url);
    });

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <img
        src={avatar !== "" ? avatar : "/images/avatar.png"}
        alt=""
        className={cx("avatar")}
      />

      <p className={cx("name")}>{data.name ? data.name : "Noname"}</p>
      <div className={cx("level")}>
        <CheckBadgeIcon className={cx("icon")} />
        <span>{data.level !== undefined ? LevelType[data.level] : "-"}</span>
      </div>
      <div className={cx("point")}>
        <TrophyIcon className={cx("icon")} />
        <span>{data.point ? data.point : 0}</span>
      </div>
    </div>
  );
};

export default StudentCard;
