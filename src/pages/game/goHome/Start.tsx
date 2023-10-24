import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAGameRound } from "../../../redux/slice/gameSlice";

import styles from "./GoHome.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../../components";
import {
  ArrowLeftOnRectangleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
const cx = classNames.bind(styles);

const Start = () => {
  const dispatch = useDispatch<AppDispatch>();

  const round = useSelector((state: RootState) => state.game.currentRound);

  useEffect(() => {
    if (round) {
      dispatch(
        getAGameRound({
          nameOfGame: "Go home!",
          id: round.id,
        })
      );
    }
  }, []);

  const homeWrapperRef = useRef<HTMLDivElement>(null);
  const obstacleWrapperRef = useRef(null);

  useEffect(() => {
    if (homeWrapperRef.current) {
      homeWrapperRef.current.style.backgroundColor = "red";
    }
  });

  const [leftOffset, setLeftOffset] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (isMoving) {
      const intervalId = setInterval(
        () => setLeftOffset((pre) => pre - 2),
        100
      );
      return () => clearInterval(intervalId);
    }
  }, [isMoving]);

  return (
    <div className={cx("stage")}>
      <section className={cx("header")}>
        <div>
          <Button
            isPrimary={false}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            className={cx("logout-button")}
          >
            <ArrowLeftOnRectangleIcon width={24} height={24} />
          </Button>
          theme
        </div>
        <div>
          <div className={cx("heart-wrapper")}>
            <HeartIcon width={32} height={32} />
            <HeartIcon width={32} height={32} />
            <HeartIcon width={32} height={32} />
          </div>
          <div>Point</div>
        </div>
      </section>
      <h1>Round 01</h1>
      <section>
        <span className={cx("driver")}>
          <img src="/images/game/driver.png" alt="" />
        </span>
      </section>
      <div
        className={cx("bg-home-lines")}
        ref={homeWrapperRef}
        style={{ left: `${leftOffset}px` }}
      >
        {[...Array(9)].map((i) => (
          <div className={cx("bg-home-item")} />
        ))}
      </div>
      <div className={cx("obstacles")} ref={obstacleWrapperRef}>
        <div style={{ top: "50%", left: "50%" }} />
      </div>
      <Button isPrimary={false} onClick={() => setIsMoving(!isMoving)}>
        Click
      </Button>
    </div>
  );
};

export default Start;
