import React from "react";
import style from "./Onboarding.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface OnboardingSurveyProps {
  onChangeAge: (e: React.FormEvent<HTMLUListElement>) => void;
  onChangePurpose: (e: React.FormEvent<HTMLUListElement>) => void;
}

const OnboardingSurvey = ({
  onChangeAge,
  onChangePurpose,
}: OnboardingSurveyProps) => {
  return (
    <div>
      <p className={cx("title")}>
        Let's do some survey to we can understand you better...
      </p>
      <p>Hãy làm chút khảo sát để chúng tôi có thêm hiểu biết về bạn nhé...</p>
      <div className={cx("item")}>
        <p className={cx("question")}>How old are you?</p>
        <p>Bạn bao nhiêu tuổi?</p>
        <ul className={cx("sub-list")} onChange={(e) => onChangeAge(e)}>
          <li>
            <label>
              <input type="radio" value={`< 18`} name="age"></input>
              {`< 18`}
            </label>
          </li>
          <li>
            <label>
              <input type="radio" value={`18 - 25`} name="age"></input>
              {`18 - 25`}
            </label>
          </li>
          <li>
            <label>
              <input type="radio" value={`> 25`} name="age"></input>
              {`> 25`}
            </label>
          </li>
        </ul>
      </div>
      <div className={cx("item")}>
        <p className={cx("question")}>
          What need do you learn English to serve?
        </p>
        <p>Bạn học tiếng Anh để phục vụ nhu cầu gì?</p>
        <ul className={cx("sub-list")} onChange={(e) => onChangePurpose(e)}>
          <li>
            <label>
              <input type="radio" value="Giao tiếp" name="purpose"></input>
              Communication (Giao tiếp)
            </label>
          </li>
          <li>
            <label>
              <input type="radio" value="Công việc" name="purpose"></input>
              Work (Công việc)
            </label>
          </li>
          <li>
            <label>
              <input type="radio" value="Học tập" name="purpose"></input>
              Education (Học tập)
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OnboardingSurvey;
