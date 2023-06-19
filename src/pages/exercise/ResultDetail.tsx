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
      <p className={cx("title")}>Chi tiết kết quả</p>
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
            <p>{item.question}</p>
            <p>
              {item.type == GameType.TranslateToVN
                ? item.vocab?.display
                : item.vocab?.meaning}
            </p>
            <p>Câu trả lời của bạn: {item.userAnswer}</p>
            <p>
              Đáp án đúng: {item.answer ? item.answer : item.vocab?.display}
            </p>
            <hr></hr>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResultDetail;