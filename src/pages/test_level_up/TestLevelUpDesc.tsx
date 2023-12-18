import React from "react";
import style from "./TestLevelUp.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../components";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(style);

const TestLevelUpDesc = ({ onStart }: { onStart: () => void }) => {
  return (
    <>
      <p className={cx("page-title")}>Complete this test to level up!</p>
      <p>The test includes 20 questions.</p>
      <br />
      <p>
        After complete, we'll give your point and corresponding level. You can
        accept to have upper level, or deny if the test gets worse result.
      </p>

      <Row center="xs" className={cx("cta-wrapper")}>
        <Col xs={6}>
          <Button
            className={cx("btn-start")}
            isPrimary
            onClick={onStart}
            haveIcon
          >
            Start
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TestLevelUpDesc;
