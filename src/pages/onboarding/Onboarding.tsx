import { useState } from "react";
import style from "./Onboarding.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../components";
import { ToastContainer } from "react-toastify";
import ChooseRoute from "./ChooseRoute";
import { LevelType } from "../../types";
import getLevel from "./CheckResult";
import OnboardingSurvey from "./OnboardingSurvey";
import OnboardingContent from "./OnboardingContent";
const cx = classNames.bind(style);

const Onboarding = () => {
  const [age, setAge] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [level, setLevel] = useState<LevelType>();

  const onFinish = (returnedResult: boolean[]) => {
    getNewLevel(returnedResult);
  };

  const onFinishAll = () => {
    setIsDone(true);
  };

  const getNewLevel = (result: boolean[]) => {
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

    setLevel(getLevel(point));
  };

  const onChangeAge = (e: any) => {
    setAge(e.target.value);
  };

  const onChangePurpose = (e: any) => {
    setPurpose(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        {isDone === false ? (
          <div>
            <OnboardingSurvey
              onChangeAge={(e) => onChangeAge(e)}
              onChangePurpose={(e) => onChangePurpose(e)}
            />
            <ul className={cx("list")}>
              <hr></hr>
              <p className={cx("sub-title")}>
                Let's briefly evaluate your current level by answering the
                questions below!
              </p>
              <p>
                Cùng đánh giá sơ qua trình độ hiện tại của bạn bằng cách trả lời
                những câu hỏi dưới đây!
              </p>
              <OnboardingContent
                onFinish={(returnedResult) => {
                  onFinish(returnedResult);
                }}
              />
            </ul>
            <Button isPrimary onClick={onFinishAll}>
              Finish
            </Button>
          </div>
        ) : (
          level !== undefined && <ChooseRoute level={level}></ChooseRoute>
        )}
      </div>
    </>
  );
};

export default Onboarding;
