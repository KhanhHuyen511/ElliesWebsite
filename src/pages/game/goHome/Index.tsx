import React from "react";
import { GameCard } from "../../../components";
import { Col } from "react-flexbox-grid";
import style from "../IndexPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const Index = () => {
  return (
    <div className="container">
      <Col xs={12} md={8} lg={6}>
        <p className={cx("page-title")}>Go Home!</p>
        <div className={cx("list")}>
          <GameCard title={"Round 01"} state="finish" />
          <GameCard title={"Round 02"} withCircle={false} />
        </div>
      </Col>
    </div>
  );
};

export default Index;
