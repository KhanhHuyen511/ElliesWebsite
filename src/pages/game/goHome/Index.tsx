import React, { useEffect } from "react";
import { GameCard } from "../../../components";
import { Col } from "react-flexbox-grid";
import style from "../IndexPage.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllGameRounds } from "../../../redux/slice/gameSlice";
const cx = classNames.bind(style);

const Index = () => {
  const rounds = useSelector((state: RootState) => state.game.rounds);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllGameRounds("Go home!"));
  }, []);

  return (
    <div className="container">
      <Col xs={12} md={8} lg={6}>
        <p className={cx("page-title")}>Go Home!</p>
        <div className={cx("list")}>
          {rounds &&
            rounds.map((item, index) => (
              <GameCard
                key={index}
                title={`Round ${item.name}`}
                withCircle={index % 2 === 0}
              />
            ))}
        </div>
      </Col>
    </div>
  );
};

export default Index;
