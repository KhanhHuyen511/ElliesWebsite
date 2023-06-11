import React from "react";
import style from "./ExerciseFinish.module.scss";
import classNames from "classnames/bind";
import { ExDetail } from "../../types";
import { CheckIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const ExerciseFinish = ({ data }: { data: ExDetail[] }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={cx("wrapper")}>
        <p>Bạn đã hoàn thành chính xác</p>
        <p className={cx("result")}>
          <span className={cx("result-right")}>
            {data.filter((o) => o.exRight).length}/
          </span>
          {data.length}
        </p>
        <div className={cx("home")}>
          <HomeIcon
            width={48}
            height={48}
            className={cx("home-icon")}
            onClick={() => {
              navigate("/");
            }}
          ></HomeIcon>
        </div>
        <div className={cx("result-detail")}>
          <p className={cx("sub-title")}>Chi tiết</p>
          <table>
            <thead>
              <th></th>
              <th>Đúng</th>
              <th>Sai</th>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>Câu {index + 1}</td>
                    <td>
                      {item.exRight && (
                        <CheckIcon
                          width={24}
                          height={24}
                          className={cx("right-icon")}
                        ></CheckIcon>
                      )}
                    </td>
                    <td>
                      {!item.exRight && (
                        <XMarkIcon
                          width={24}
                          height={24}
                          className={cx("wrong-icon")}
                        ></XMarkIcon>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ExerciseFinish;
