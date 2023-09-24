import React from "react";
import style from "./Leaderboard.module.scss";
import classNames from "classnames/bind";
import { RankItem } from "../../components";
const cx = classNames.bind(style);

const Leaderboard = () => {
  return (
    <div className="container">
      <p className={cx("page-title")}>Leaderboard</p>
      <div className={cx("top-three")}>
        <RankItem
          rank={2}
          name={"Ellie"}
          avt={"/images/avatar.png"}
          point={300}
        ></RankItem>
        <RankItem
          rank={1}
          name={"Ellie"}
          avt={"/images/avatar.png"}
          point={300}
        ></RankItem>

        <RankItem
          rank={3}
          name={"Ellie"}
          avt={"/images/avatar.png"}
          point={300}
        ></RankItem>
      </div>
      <div className={cx("top-remain")}>
        <div className={cx("item")}>
          <span className={cx("stt")}>4.</span>
          <img src="" alt="" />
          <span className={cx("name")}>Name</span>
          <p className={cx("point")}>
            <span>Point:</span>
            <span>900</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
