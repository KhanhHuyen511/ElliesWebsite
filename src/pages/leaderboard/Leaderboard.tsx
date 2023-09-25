import React, { useEffect, useState } from "react";
import style from "./Leaderboard.module.scss";
import classNames from "classnames/bind";
import { RankItem } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getAllStudents,
  getAllStudentsAscendByPoint,
} from "../../redux/slice/adminSlice";
import { Student } from "../../types";
const cx = classNames.bind(style);

const Leaderboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.admin.listUsers);

  useEffect(() => {
    dispatch(getAllStudentsAscendByPoint());
  }, []);

  return (
    <div className="container">
      <p className={cx("page-title")}>Leaderboard</p>
      {data !== undefined && (
        <>
          <div className={cx("top-three")}>
            {data?.length >= 2 && (
              <RankItem
                rank={2}
                name={data[1].name ? data[1].name : "noname"}
                avt={"/images/avatar.png"}
                point={data[1].point}
              ></RankItem>
            )}
            {data?.length >= 1 && (
              <RankItem
                rank={1}
                name={data[0].name ? data[0].name : "noname"}
                avt={"/images/avatar.png"}
                point={data[0].point}
              ></RankItem>
            )}
            {data?.length >= 3 && (
              <RankItem
                rank={3}
                name={data[2].name ? data[2].name : "noname"}
                avt={"/images/avatar.png"}
                point={data[2].point}
              ></RankItem>
            )}
          </div>
          {data?.length > 3 && (
            <div className={cx("top-remain")}>
              {data.slice(3, data.length).map((i, index) => (
                <div className={cx("item")}>
                  <span className={cx("stt")}>{index + 4}.</span>
                  <img src="" alt="" />
                  <span className={cx("name")}>
                    {i.name ? i.name : "noname"}
                  </span>
                  <p className={cx("point")}>
                    <span>Point:</span>
                    <span>{i.point}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
