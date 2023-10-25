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
    setIsMoving(true);
  }, []);

  const homeWrapperRef = useRef<HTMLDivElement>(null);
  const obstacleWrapperRef = useRef(null);

  const [leftOffset, setLeftOffset] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const driverBoundaryRightOffset = [-120, -376];

  useEffect(() => {
    if (isMoving) {
      console.log(leftOffset);
      if (driverBoundaryRightOffset.find((i) => i === leftOffset)) {
        setIsMoving(false);
        return;
      }
      const intervalId = setInterval(
        () => setLeftOffset((pre) => pre - 4),
        100
      );
      return () => clearInterval(intervalId);
    }
  }, [isMoving, leftOffset]);

  const [driverOffset, setDriverOffset] = useState(0);
  const [isDriverMovingUp, setIsDriverMovingUp] = useState(false);

  useEffect(() => {
    if (isMoving) {
      const intervalDriver = setInterval(
        () =>
          setDriverOffset((pre) => {
            if (isDriverMovingUp) {
              setIsDriverMovingUp(false);
              return pre + 2;
            } else {
              setIsDriverMovingUp(true);
              return pre - 2;
            }
          }),
        150
      );
      return () => clearInterval(intervalDriver);
    }
  }, [isDriverMovingUp, isMoving]);

  interface OffsetType {
    x: number; // percent: x%
    y: number;
    height?: number;
  }

  const obstacleList: OffsetType[] = [
    {
      x: 50,
      y: 50,
    },
    {
      x: 80,
      y: 40,
      height: 100,
    },
  ];

  const continueMove = () => {
    setLeftOffset((pre) => pre - 4);
    setIsMoving(true);
  };

  const pauseMove = () => {
    setIsMoving(!isMoving);
  };

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
        <span
          className={cx("driver")}
          style={{ marginTop: `${driverOffset}px` }}
        >
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
      <div
        className={cx("obstacles")}
        ref={obstacleWrapperRef}
        style={{ left: `${leftOffset}px` }}
      >
        {obstacleList.map((obstacle, index) => (
          <div
            key={index}
            style={{
              top: `${obstacle.y}%`,
              left: `${obstacle.x}%`,
              height: `${obstacle.height}px`,
            }}
          />
        ))}
      </div>
      <Button isPrimary={false} onClick={pauseMove}>
        Pause
      </Button>
      <Button isPrimary={false} onClick={continueMove}>
        Continue
      </Button>
    </div>
  );
};

export default Start;
