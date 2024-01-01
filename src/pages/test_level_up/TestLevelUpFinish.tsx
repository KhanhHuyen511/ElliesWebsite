import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./TestLevelUp.module.scss";
import getLevel from "../onboarding/CheckResult";
import { LevelType } from "../../types";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getStudentLevel } from "../../redux/slice/studentSlice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

interface TestLevelUpFinishProps {
  result: boolean[];
}

const TestLevelUpFinish = ({ result }: TestLevelUpFinishProps) => {
  const [level, setLevel] = useState<number>();
  const [newLevel, setNewLevel] = useState<number>();
  const [comparison, setComparison] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  useEffect(() => {
    dispatch(getStudentLevel(userID)).then((data) =>
      setLevel(data.payload as number)
    );

    const getNewLevel = () => {
      let point: number = 0;

      result.forEach((i, index) => {
        if (index in [0, 1, 2]) {
          if (i === true) {
            point += 1.5;
          }
        } else if (index in [3, 4, 5, 6]) {
          if (i === true) {
            point += 1;
          }
        } else if (i === true) {
          point += 0.5;
        }
      });

      setNewLevel(getLevel(point));
      return LevelType[getLevel(point)];
    };

    const getComparison = () => {
      if (level !== undefined && newLevel !== undefined) {
        if (level === newLevel) {
          setComparison("same");
          return;
        }

        if (level < newLevel) {
          setComparison("worsen");
          return;
        }

        if (level > newLevel) {
          setComparison("upper");
          return;
        }
      }
    };

    getNewLevel();
    getComparison();
  }, [dispatch, userID]);

  const handleChangeLevel = () => {};

  const navigateToHome = () => {
    navigate("/study");
  };

  return (
    <div>
      <p className={cx("page-title", "text-center")}>Result:</p>
      <p className={cx("page-number")}>
        <span>{result.filter((result) => result === true).length}/</span>
        {result.length}
      </p>
      Your new Level: {newLevel}
      {level !== undefined && newLevel !== undefined && (
        <p>
          This level is {comparison} your current level ({LevelType[level]})
        </p>
      )}
      {comparison === "same" && (
        <p>Cuz you are same level, you can not upper to new level!</p>
      )}
      {comparison === "lower" && newLevel && (
        <p>
          Cuz you are lower level, you can not upper to new level! Do you want
          down to {LevelType[newLevel]}
        </p>
      )}
      {comparison === "upper" && newLevel !== undefined && (
        <p>Congratulation! Do you want upper to {LevelType[newLevel]}</p>
      )}
      <div className={cx("button-group")}>
        {newLevel !== undefined && comparison !== "same" && (
          <Button isPrimary onClick={handleChangeLevel}>
            Accept
          </Button>
        )}
        <Button isPrimary={false} onClick={navigateToHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default TestLevelUpFinish;
