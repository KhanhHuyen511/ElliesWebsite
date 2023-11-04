import React from "react";
import style from "./GoHome.module.scss";
import className from "classnames/bind";
import { UserGameRound } from "../../../types";
import { Button } from "../../../components";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const cx = className.bind(style);

const Result = () => {
  const navigator = useNavigate();

  const userGameRound: UserGameRound = {
    id: "",
    userId: "",
    gameRoundId: "",
    listUserGameCard: [],
    totalPoint: 300,
    rightCount: 3,
  };

  return (
    <div className={cx("finish-wrapper")}>
      <p className={cx("title")}>Round 01</p>
      <p className={cx("point")}>Point: {userGameRound.totalPoint}</p>
      <p className={cx("right-count")}>
        You right: {userGameRound.rightCount}/15
      </p>
      <div className={cx("cta")}>
        <Button
          isPrimary
          onClick={() => {
            navigator("/leaderboard");
          }}
        >
          View leaderboard
        </Button>
        <HomeIcon width={36} height={36} onClick={() => navigator(-3)} />
      </div>
    </div>
  );
};

export default Result;
