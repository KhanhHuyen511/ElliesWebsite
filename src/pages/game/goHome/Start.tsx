import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Question from "./Question";
import styles from "./GoHome.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../../components";
import {
  ArrowLeftOnRectangleIcon,
  HeartIcon,
  HomeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const Start = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  const round = useSelector((state: RootState) => state.game.currentRound);

  useEffect(() => {
    setIsMoving(true);
  }, []);

  const homeWrapperRef = useRef<HTMLDivElement>(null);
  const driverRef = useRef<HTMLSpanElement>(null);
  const obstacleWrapperRef = useRef(null);

  const [leftOffset, setLeftOffset] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const driverBoundaryRightOffset = [
    -30, -40, -50, -60, -70, -80, -90, -100, -110, -120, -130,
  ];

  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [isMeetObstacle, setIsMeetObstacle] = useState(false);

  const [right, setRight] = useState<boolean[]>();
  const [isFinished, setIsFinished] = useState(false);
  const [heart, setHeart] = useState<number>(3);
  const [point, setPoint] = useState<number>(0);

  const handleHeart = (result: boolean) => {
    if (result === false) {
      setHeart((pre) => pre - 1);

      if (heart === 1) {
        setIsFinished(true);
      }
    } else {
      setRight((pre) => [...(pre ?? []).map((i) => i), result]);
      setPoint((pre) => pre + 20);
    }
  };

  useEffect(() => {
    if (!isFinished && isMoving) {
      if (leftOffset < driverBoundaryRightOffset[10]) {
        setIsMoving(false);
        setIsFinished(true);

        console.log("right", right);
        return;
      } else {
        const meetPos = driverBoundaryRightOffset.findIndex(
          (i) => i === leftOffset
        );
        if (meetPos >= 0) {
          setIsMoving(false);
          setIsMeetObstacle(true);
          setCurrentQuestion(round?.questions[meetPos]);
          return;
        }
        const intervalId = setInterval(
          () => setLeftOffset((pre) => pre - 1),
          100
        );
        return () => clearInterval(intervalId);
      }
    }
  }, [isMoving, leftOffset]);

  const [driverOffset, setDriverOffset] = useState(0);
  const [isDriverMovingUp, setIsDriverMovingUp] = useState(false);

  useEffect(() => {
    if (!isFinished && isMoving) {
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
      x: 30,
      y: 50,
    },
    {
      x: 40,
      y: 40,
    },
    {
      x: 50,
      y: 40,
    },
    {
      x: 60,
      y: 40,
    },
    {
      x: 70,
      y: 40,
    },
    {
      x: 80,
      y: 40,
    },
    {
      x: 90,
      y: 40,
    },
    {
      x: 100,
      y: 40,
    },
    {
      x: 110,
      y: 40,
    },
    {
      x: 120,
      y: 40,
    },
    {
      x: 130,
      y: 40,
    },
  ];

  const continueMove = () => {
    setLeftOffset((pre) => pre - 1);
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
            {[...Array(heart)].map((i) => (
              <HeartIcon width={32} height={32} />
            ))}
          </div>
          <div>Point: {point}</div>
        </div>
      </section>
      <h1>Round {round?.name}</h1>
      <section>
        <span
          className={cx("driver")}
          ref={driverRef}
          style={{ marginTop: `${driverOffset}px` }}
        >
          <img src="/images/game/driver.png" alt="" />
        </span>
      </section>
      <div
        className={cx("bg-home-lines")}
        ref={homeWrapperRef}
        style={{ left: `calc(${leftOffset}% + 269px)` }}
      >
        {[...Array(20)].map((i) => (
          <div className={cx("bg-home-item")} />
        ))}
        <div className={cx("end-home")}>
          <img src="/images/game/house-small.png" alt="" />
        </div>
      </div>
      <div
        className={cx("obstacles")}
        ref={obstacleWrapperRef}
        style={{ left: `calc(${leftOffset}% + 269px)` }}
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
      {isMeetObstacle && (
        <div>
          <div className={cx("modal")}></div>
          {currentQuestion && (
            <Question
              question={currentQuestion}
              onSubmit={(r) => {
                setIsMeetObstacle(false);
                continueMove();

                handleHeart(r);
              }}
            />
          )}
        </div>
      )}
      {isFinished && (
        <div className={cx("result-wrapper")}>
          <div className={cx("content")}>
            <div className={cx("left")}>
              <span className={cx("result-title")}>
                You {heart > 0 ? "win" : "lose"}!!
              </span>
              <div className={cx("stars")}>
                {[...Array((point / 60).toFixed(0))].map((i) => (
                  <StarIcon
                    width={36}
                    height={36}
                    fill="var(--Y500)"
                    color="transparent"
                  />
                ))}
              </div>
            </div>
            <div className={cx("right")}>
              <HomeIcon
                width={36}
                height={36}
                onClick={() => navigator("./../result")}
              />
              <Button isPrimary onClick={() => {}} haveIcon>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
