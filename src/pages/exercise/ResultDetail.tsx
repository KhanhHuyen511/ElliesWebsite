import React, { useEffect } from "react";
import { GameType, UserEx } from "../../types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAnUserEx } from "../../redux/slice/exSlice";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import style from "./ResultDetail.module.scss";
import classNames from "classnames/bind";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
const cx = classNames.bind(style);

const ResultDetail = () => {
  let { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const data: UserEx = useSelector(
    (state: RootState) => state.ex.currentUserEx
  ) as UserEx;

  useEffect(() => {
    if (id) dispatch(getAnUserEx(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="container">
        <p className={cx("title")}>Detail Result</p>
        <ul>
          {data?.resultList.map((item, index) => (
            <li key={index}>
              {item.exRight ? (
                <CheckIcon
                  width={24}
                  height={24}
                  className={cx("right-icon")}
                ></CheckIcon>
              ) : (
                <XMarkIcon
                  width={24}
                  height={24}
                  className={cx("wrong-icon")}
                ></XMarkIcon>
              )}
              <p className={cx("question")}>{item.question}</p>
              <p className={cx("vocab")}>
                "
                {item.type == GameType.TranslateToVN
                  ? item.vocab?.display
                  : item.vocab?.meaning}
                "
              </p>
              <p>Your answer: {item.userAnswer}</p>
              <p>
                Right answer:{" "}
                <span className={cx("answer")}>
                  {item.answer ? item.answer : item.vocab?.display}
                </span>
              </p>
              <hr></hr>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ResultDetail;
