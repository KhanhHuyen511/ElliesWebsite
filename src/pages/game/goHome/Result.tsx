import React, { useEffect, useState } from "react";
import style from "./GoHome.module.scss";
import className from "classnames/bind";
import { GameRound, UserGameRound } from "../../../types";
import { Button } from "../../../components";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAGameRound } from "../../../redux/slice/gameSlice";
const cx = className.bind(style);

const Result = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userGameRound = useSelector(
    (state: RootState) => state.game.userGameRound
  );

  const [nameOfGameRound, setNameOfGameRound] = useState("");

  useEffect(() => {
    if (userGameRound)
      dispatch(
        getAGameRound({ nameOfGame: "Go home!", id: userGameRound.gameRoundId })
      ).then((gameRound) =>
        setNameOfGameRound((gameRound.payload as GameRound).name)
      );
  });

  return (
    <div className="container">
      {userGameRound && (
        <div className={cx("finish-wrapper")}>
          <p className={cx("title")}>Round {nameOfGameRound}</p>
          <p className={cx("point")}>Point: {userGameRound.totalPoint}</p>
          <p className={cx("right-count")}>
            You right: {userGameRound.rightCount}/11
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
      )}
    </div>
  );
};

export default Result;
